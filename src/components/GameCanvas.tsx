"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    Ball,
    Paddle,
    Brick,
    Item,
    createBricks,
    detectCollision,
    updateItems,
    moveBricksDown,
    generateNewRow,
    checkBrickInvasion,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    BALL_RADIUS,
    BRICK_WIDTH,
    BRICK_HEIGHT,
} from "../utils/gameLogic";

export default function GameCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState<"start" | "playing" | "won" | "gameover">("start");
    const requestRef = useRef<number>(0);
    const lastDescentTimeRef = useRef<number>(0);
    const transformationExpiryRef = useRef<number>(0);

    // Game State Refs (to avoid closure staleness in loop)
    const ballRef = useRef<Ball>({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 30, dx: 4, dy: -5, radius: BALL_RADIUS, speed: 8, type: "normal" });
    const paddleRef = useRef<Paddle>({ x: (CANVAS_WIDTH - PADDLE_WIDTH) / 2, y: CANVAS_HEIGHT - PADDLE_HEIGHT - 10, width: PADDLE_WIDTH, height: PADDLE_HEIGHT, speed: 10, dx: 0 });
    const bricksRef = useRef<Brick[]>(createBricks());
    const itemsRef = useRef<Item[]>([]);

    const initGame = () => {
        setScore(0);
        setGameState("playing");
        ballRef.current = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 30, dx: 4, dy: -5, radius: BALL_RADIUS, speed: 8, type: "normal" };
        paddleRef.current = { x: (CANVAS_WIDTH - PADDLE_WIDTH) / 2, y: CANVAS_HEIGHT - PADDLE_HEIGHT - 10, width: PADDLE_WIDTH, height: PADDLE_HEIGHT, speed: 10, dx: 0 };
        bricksRef.current = createBricks();
        itemsRef.current = [];
        lastDescentTimeRef.current = Date.now();
    };

    const drawBall = (ctx: CanvasRenderingContext2D) => {
        const ball = ballRef.current;

        if (ball.type === "normal") {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.shadowBlur = 10; // Reduced from 20
            ctx.shadowColor = "#00ffff";
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow
            ctx.closePath();
        } else {
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            const emoji = ball.type === "rock" ? "🪨" : "✂️";
            ctx.fillText(emoji, ball.x, ball.y);
        }
    };

    const drawPaddle = (ctx: CanvasRenderingContext2D) => {
        const paddle = paddleRef.current;
        ctx.beginPath();
        ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 10);
        ctx.fillStyle = "#ff00ff";
        ctx.shadowBlur = 10; // Reduced from 20
        ctx.shadowColor = "#ff00ff";
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.closePath();
    };

    const drawBricks = (ctx: CanvasRenderingContext2D) => {
        const bricks = bricksRef.current;
        const colors = ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3"];

        bricks.forEach((b, index) => {
            if (b.status === 1) {
                ctx.beginPath();
                ctx.roundRect(b.x, b.y, b.width, b.height, 5);

                if (b.type === "stone") {
                    // Stone Brick Style: Mini Brick Wall Pattern
                    // Background (Mortar)
                    ctx.fillStyle = "#3e2723"; // Dark Brown/Black for mortar
                    ctx.fill();

                    // Draw mini bricks inside
                    ctx.fillStyle = "#8D6E63"; // Brownish brick color
                    const rowHeight = b.height / 2;
                    const brickWidth = b.width / 3;

                    // Row 1
                    for (let i = 0; i < 3; i++) {
                        ctx.fillRect(b.x + i * brickWidth + 1, b.y + 1, brickWidth - 2, rowHeight - 2);
                    }
                    // Row 2 (Offset)
                    ctx.fillRect(b.x + 1, b.y + rowHeight + 1, brickWidth / 2 - 2, rowHeight - 2); // Left half
                    for (let i = 0; i < 2; i++) {
                        ctx.fillRect(b.x + brickWidth / 2 + i * brickWidth + 1, b.y + rowHeight + 1, brickWidth - 2, rowHeight - 2);
                    }
                    ctx.fillRect(b.x + brickWidth / 2 + 2 * brickWidth + 1, b.y + rowHeight + 1, brickWidth / 2 - 2, rowHeight - 2); // Right half

                } else if (b.type === "paper") {
                    // Paper Brick Style: Document look with Folded Corner
                    const foldSize = 10;

                    ctx.beginPath();
                    ctx.moveTo(b.x, b.y);
                    ctx.lineTo(b.x + b.width - foldSize, b.y);
                    ctx.lineTo(b.x + b.width, b.y + foldSize);
                    ctx.lineTo(b.x + b.width, b.y + b.height);
                    ctx.lineTo(b.x, b.y + b.height);
                    ctx.closePath();

                    ctx.fillStyle = "#f5f5f5"; // White Smoke
                    ctx.shadowColor = "#ffffff";
                    ctx.shadowBlur = 5;
                    ctx.fill();

                    // Draw "Text" lines
                    ctx.fillStyle = "#bdbdbd"; // Grey lines
                    const lineHeight = 4;
                    const margin = 6;
                    for (let i = margin + 5; i < b.height - margin; i += lineHeight * 2) {
                        ctx.fillRect(b.x + margin, b.y + i, b.width - margin * 2, 2);
                    }

                    // Draw the Fold flap
                    ctx.fillStyle = "#e0e0e0"; // Darker shade for the fold
                    ctx.beginPath();
                    ctx.moveTo(b.x + b.width - foldSize, b.y);
                    ctx.lineTo(b.x + b.width, b.y + foldSize);
                    ctx.lineTo(b.x + b.width - foldSize, b.y + foldSize);
                    ctx.fill();

                    // Clear the corner to make it look folded
                    ctx.fillStyle = "#000000"; // Background color (assuming black/dark bg) - actually we should just not draw the main rect there, but clearing is easier if we know bg. 
                    // Better approach: Draw the main rect with a path that excludes the corner? 
                    // Or just draw the fold on top. The fold covers the corner. 
                    // Wait, to look like a fold, the corner of the paper itself should be missing.
                    // Let's redraw the paper shape with a cut corner first.
                } else {
                    ctx.fillStyle = colors[index % colors.length];
                    ctx.shadowColor = colors[index % colors.length];
                    ctx.shadowBlur = 5;
                    ctx.fill();
                }

                ctx.shadowBlur = 0;

                ctx.closePath();
            }
        });
    };

    const drawItems = (ctx: CanvasRenderingContext2D) => {
        const items = itemsRef.current;
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        items.forEach(item => {
            if (item.active) {
                const emoji = item.type === "rock" ? "🪨" : "✂️";
                ctx.fillText(emoji, item.x + item.width / 2, item.y + item.height / 2);
            }
        });
    };

    const update = () => {
        if (gameState !== "playing") return;

        const ball = ballRef.current;
        const paddle = paddleRef.current;
        let bricks = bricksRef.current;
        const items = itemsRef.current;

        // Endless Mode: Descent Logic
        if (Date.now() - lastDescentTimeRef.current > 5000) {
            bricks = moveBricksDown(bricks);
            const newRow = generateNewRow();
            bricks = [...bricks, ...newRow];
            bricksRef.current = bricks;
            lastDescentTimeRef.current = Date.now();
        }

        // Check Invasion (Game Over)
        if (checkBrickInvasion(bricks, paddle.y)) {
            setGameState("gameover");
            return;
        }

        // Move Paddle
        paddle.x += paddle.dx;
        if (paddle.x < 0) paddle.x = 0;
        if (paddle.x + paddle.width > CANVAS_WIDTH) paddle.x = CANVAS_WIDTH - paddle.width;

        // Move Ball
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Update Items
        const { activeItems, collectedType } = updateItems(items, paddle);
        itemsRef.current = activeItems;

        if (collectedType) {
            ball.type = collectedType;
            transformationExpiryRef.current = Date.now() + 10000; // 10 seconds duration
        }

        // Check Transformation Expiry
        if (ball.type !== "normal" && Date.now() > transformationExpiryRef.current) {
            ball.type = "normal";
        }

        // Collision Detection
        const { scoreIncrement, newItems } = detectCollision(ball, paddle, bricks, items);
        if (scoreIncrement > 0) {
            setScore((prev) => prev + scoreIncrement);
        }

        if (newItems.length > 0) {
            itemsRef.current = [...itemsRef.current, ...newItems];
        }

        // Game Over Condition (Ball lost)
        if (ball.y + ball.dy > CANVAS_HEIGHT - ball.radius) {
            setGameState("gameover");
        }
    };

    const draw = (ctx: CanvasRenderingContext2D) => {
        // Clear with transparent black for trail effect (optional, but sticking to clean clear for now)
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Background Grid (Retro Effect)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 1;
        for (let i = 0; i < CANVAS_WIDTH; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, CANVAS_HEIGHT);
            ctx.stroke();
        }
        for (let i = 0; i < CANVAS_HEIGHT; i += 40) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(CANVAS_WIDTH, i);
            ctx.stroke();
        }

        drawBricks(ctx);
        drawItems(ctx);
        drawBall(ctx);
        drawPaddle(ctx);
    };

    const loop = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (gameState === "playing") {
            update();
            draw(ctx);
            requestRef.current = requestAnimationFrame(loop);
        } else if (gameState === "start") {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.font = "bold 40px Courier New";
            ctx.fillStyle = "#00ffff";
            ctx.textAlign = "center";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#00ffff";
            ctx.fillText("PRESS START TO PLAY", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
            ctx.shadowBlur = 0;
        } else if (gameState === "gameover") {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.font = "bold 50px Courier New";
            ctx.fillStyle = "#ff0055";
            ctx.textAlign = "center";
            ctx.shadowBlur = 20;
            ctx.shadowColor = "#ff0055";
            ctx.fillText("GAME OVER", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
            ctx.shadowBlur = 0;
        } else if (gameState === "won") {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.font = "bold 50px Courier New";
            ctx.fillStyle = "#00ff00";
            ctx.textAlign = "center";
            ctx.shadowBlur = 20;
            ctx.shadowColor = "#00ff00";
            ctx.fillText("YOU WON!", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
            ctx.shadowBlur = 0;
        }
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [gameState]);

    // Input Handling with Key State Tracking
    useEffect(() => {
        const keysPressed = new Set<string>();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Right" || e.key === "ArrowRight") {
                keysPressed.add("right");
            } else if (e.key === "Left" || e.key === "ArrowLeft") {
                keysPressed.add("left");
            }

            // Update paddle direction based on current key state
            if (keysPressed.has("right") && !keysPressed.has("left")) {
                paddleRef.current.dx = paddleRef.current.speed;
            } else if (keysPressed.has("left") && !keysPressed.has("right")) {
                paddleRef.current.dx = -paddleRef.current.speed;
            } else {
                // Both keys pressed or no keys pressed
                paddleRef.current.dx = 0;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Right" || e.key === "ArrowRight") {
                keysPressed.delete("right");
            } else if (e.key === "Left" || e.key === "ArrowLeft") {
                keysPressed.delete("left");
            }

            // Update paddle direction based on current key state
            if (keysPressed.has("right") && !keysPressed.has("left")) {
                paddleRef.current.dx = paddleRef.current.speed;
            } else if (keysPressed.has("left") && !keysPressed.has("right")) {
                paddleRef.current.dx = -paddleRef.current.speed;
            } else {
                // Both keys pressed or no keys pressed
                paddleRef.current.dx = 0;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-mono">
            <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]">
                NEON BREAKER
            </h1>
            <div className="mb-4 text-2xl font-semibold text-cyan-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]">
                SCORE: {score}
            </div>
            <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="bg-black shadow-[0_0_20px_rgba(0,255,255,0.3)] rounded-xl border-2 border-purple-500"
            />
            <div className="mt-8 space-x-4">
                {gameState !== "playing" && (
                    <button
                        onClick={initGame}
                        className="px-8 py-3 bg-transparent border-2 border-pink-500 text-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 font-bold text-lg shadow-[0_0_10px_rgba(255,0,127,0.5)] hover:shadow-[0_0_20px_rgba(255,0,127,1)]"
                    >
                        {gameState === "start" ? "START GAME" : "PLAY AGAIN"}
                    </button>
                )}
            </div>
            <p className="mt-6 text-gray-400 text-sm tracking-widest">USE LEFT/RIGHT ARROW KEYS TO MOVE</p>
        </div>
    );
}
