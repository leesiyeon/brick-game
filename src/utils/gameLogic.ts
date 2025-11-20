export type Ball = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  speed: number;
  type: "normal" | "rock" | "scissors";
};

export type Paddle = {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  dx: number;
};

export type BrickType = "normal" | "paper" | "stone";

export type Brick = {
  x: number;
  y: number;
  width: number;
  height: number;
  status: number; // 1 = active, 0 = broken
  type: BrickType;
};

export type ItemType = "rock" | "scissors";

export type Item = {
  id: number;
  x: number;
  y: number;
  dy: number;
  width: number;
  height: number;
  type: ItemType;
  active: boolean;
};

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const PADDLE_WIDTH = 100;
export const PADDLE_HEIGHT = 15;
export const BALL_RADIUS = 8;
export const BRICK_ROW_COUNT = 5;
export const BRICK_COLUMN_COUNT = 9;
export const BRICK_WIDTH = 75;
export const BRICK_HEIGHT = 20;
export const BRICK_PADDING = 10;
export const BRICK_OFFSET_TOP = 30;
export const BRICK_OFFSET_LEFT = 35;
export const ITEM_SIZE = 20;
export const ITEM_SPEED = 3;

export function createBricks(): Brick[] {
  const bricks: Brick[] = [];
  for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
    for (let r = 0; r < BRICK_ROW_COUNT; r++) {
      const brickX = c * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
      const brickY = r * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;

      // Randomize brick type
      const rand = Math.random();
      let type: BrickType = "normal";
      if (rand < 0.2) type = "stone"; // 20% Stone
      else if (rand < 0.5) type = "paper"; // 30% Paper

      bricks.push({ x: brickX, y: brickY, width: BRICK_WIDTH, height: BRICK_HEIGHT, status: 1, type });
    }
  }
  return bricks;
}

export function generateNewRow(): Brick[] {
  const newRow: Brick[] = [];
  for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
    const brickX = c * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
    const brickY = BRICK_OFFSET_TOP; // Start at the top

    const rand = Math.random();
    let type: BrickType = "normal";
    if (rand < 0.2) type = "stone";
    else if (rand < 0.5) type = "paper";

    newRow.push({ x: brickX, y: brickY, width: BRICK_WIDTH, height: BRICK_HEIGHT, status: 1, type });
  }
  return newRow;
}

export function moveBricksDown(bricks: Brick[]): Brick[] {
  return bricks.map(b => ({
    ...b,
    y: b.y + (BRICK_HEIGHT + BRICK_PADDING)
  }));
}

export function checkBrickInvasion(bricks: Brick[], paddleY: number): boolean {
  return bricks.some(b => b.status === 1 && b.y + b.height >= paddleY);
}

export function detectCollision(
  ball: Ball,
  paddle: Paddle,
  bricks: Brick[],
  items: Item[]
): { scoreIncrement: number; allCleared: boolean; newItems: Item[] } {
  let scoreIncrement = 0;
  let activeBricksCount = 0;
  const newItems: Item[] = [];

  // Wall collisions
  if (ball.x + ball.dx > CANVAS_WIDTH - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  }

  // Paddle collision
  if (
    ball.y + ball.dy > CANVAS_HEIGHT - ball.radius - PADDLE_HEIGHT &&
    ball.y + ball.dy < CANVAS_HEIGHT - ball.radius &&
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.width
  ) {
    // Calculate impact point (normalized -1 to 1)
    let collidePoint = ball.x - (paddle.x + paddle.width / 2);
    collidePoint = collidePoint / (paddle.width / 2);

    // Angle: map -1..1 to -60..60 degrees (approx)
    let angle = collidePoint * (Math.PI / 3);

    ball.dx = ball.speed * Math.sin(angle);
    ball.dy = -ball.speed * Math.cos(angle);
  }

  // Brick collision
  for (let i = 0; i < bricks.length; i++) {
    const b = bricks[i];
    if (b.status === 1) {
      activeBricksCount++;

      // AABB Collision Detection with Ball Radius
      // Check if ball overlaps with brick
      const ballLeft = ball.x - ball.radius;
      const ballRight = ball.x + ball.radius;
      const ballTop = ball.y - ball.radius;
      const ballBottom = ball.y + ball.radius;

      const brickLeft = b.x;
      const brickRight = b.x + b.width;
      const brickTop = b.y;
      const brickBottom = b.y + b.height;

      // Check for overlap
      if (
        ballRight > brickLeft &&
        ballLeft < brickRight &&
        ballBottom > brickTop &&
        ballTop < brickBottom
      ) {
        // Determine if brick should break based on ball type
        let shouldBreak = false;

        if (ball.type === "rock") {
          shouldBreak = true; // Rock breaks everything
        } else if (ball.type === "scissors") {
          if (b.type === "paper") shouldBreak = true; // Scissors only breaks Paper
        } else {
          // Normal ball
          if (b.type !== "stone") shouldBreak = true; // Normal breaks Normal/Paper, but not Stone
        }

        // Determine collision side for proper bounce
        // Calculate overlap on each side
        const overlapLeft = ballRight - brickLeft;
        const overlapRight = brickRight - ballLeft;
        const overlapTop = ballBottom - brickTop;
        const overlapBottom = brickBottom - ballTop;

        // Find the smallest overlap (that's the side we hit)
        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

        // Bounce based on which side had the smallest overlap
        if (minOverlap === overlapTop || minOverlap === overlapBottom) {
          ball.dy = -ball.dy; // Hit top or bottom
        } else {
          ball.dx = -ball.dx; // Hit left or right
        }

        if (shouldBreak) {
          b.status = 0;
          scoreIncrement++;
          activeBricksCount--;

          // Item Drop Chance (20%)
          if (Math.random() < 0.2) {
            newItems.push({
              id: Date.now() + Math.random(),
              x: b.x + BRICK_WIDTH / 2 - ITEM_SIZE / 2,
              y: b.y + BRICK_HEIGHT,
              dy: ITEM_SPEED,
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              type: Math.random() < 0.5 ? "rock" : "scissors",
              active: true,
            });
          }
        }

        // Only process one brick collision per frame to prevent multiple bounces
        break;
      }
    }
  }

  return { scoreIncrement, allCleared: false, newItems }; // Endless mode, never all cleared
}

export function updateItems(items: Item[], paddle: Paddle): { activeItems: Item[]; collectedType: ItemType | null } {
  let collectedType: ItemType | null = null;
  const activeItems = items.filter((item) => {
    if (!item.active) return false;

    item.y += item.dy;

    // Check collision with paddle
    if (
      item.y + item.height > paddle.y &&
      item.y < paddle.y + paddle.height &&
      item.x + item.width > paddle.x &&
      item.x < paddle.x + paddle.width
    ) {
      collectedType = item.type;
      return false; // Collected
    }

    // Remove if off screen
    if (item.y > CANVAS_HEIGHT) {
      return false;
    }

    return true;
  });

  return { activeItems, collectedType };
}
