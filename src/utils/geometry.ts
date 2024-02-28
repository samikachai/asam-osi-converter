import type { Quaternion } from "@foxglove/schemas";

export function eulerToQuaternion(roll: number, pitch: number, yaw: number): Quaternion {
  const cy = Math.cos(yaw * 0.5);
  const sy = Math.sin(yaw * 0.5);
  const cr = Math.cos(roll * 0.5);
  const sr = Math.sin(roll * 0.5);
  const cp = Math.cos(pitch * 0.5);
  const sp = Math.sin(pitch * 0.5);

  const w = cy * cr * cp + sy * sr * sp;
  const x = cy * sr * cp - sy * cr * sp;
  const y = cy * cr * sp + sy * sr * cp;
  const z = sy * cr * cp - cy * sr * sp;

  return { x, y, z, w };
}
