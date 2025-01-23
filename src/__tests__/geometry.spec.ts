import { eulerToQuaternion } from "../../common/utils/geometry";

describe("eulerToQuaternion", () => {
  it("should return identity quaternion for zero angles", () => {
    const result = eulerToQuaternion(0, 0, 0);
    expect(result).toEqual({ x: 0, y: 0, z: 0, w: 1 });
  });

  it("should return correct quaternion for 90° roll", () => {
    const result = eulerToQuaternion(Math.PI / 2, 0, 0);
    expect(result.x).toBeCloseTo(Math.SQRT1_2);
    expect(result.y).toBeCloseTo(0);
    expect(result.z).toBeCloseTo(0);
    expect(result.w).toBeCloseTo(Math.SQRT1_2);
  });

  it("should return correct quaternion for 90° pitch", () => {
    const result = eulerToQuaternion(0, Math.PI / 2, 0);
    expect(result.x).toBeCloseTo(0);
    expect(result.y).toBeCloseTo(Math.SQRT1_2);
    expect(result.z).toBeCloseTo(0);
    expect(result.w).toBeCloseTo(Math.SQRT1_2);
  });

  it("should return correct quaternion for 90° yaw", () => {
    const result = eulerToQuaternion(0, 0, Math.PI / 2);
    expect(result.x).toBeCloseTo(0);
    expect(result.y).toBeCloseTo(0);
    expect(result.z).toBeCloseTo(Math.SQRT1_2);
    expect(result.w).toBeCloseTo(Math.SQRT1_2);
  });

  it("should return correct quaternion for 45° roll, 30° pitch, 60° yaw", () => {
    const result = eulerToQuaternion(Math.PI / 4, Math.PI / 6, Math.PI / 3);
    expect(result.x).toBeCloseTo(0.20056, 5);
    expect(result.y).toBeCloseTo(0.3919, 5);
    expect(result.z).toBeCloseTo(0.360423, 5);
    expect(result.w).toBeCloseTo(0.822363, 5);
  });

  it("should return correct quaternion for -45° roll, -30° pitch, -60° yaw", () => {
    const result = eulerToQuaternion(-Math.PI / 4, -Math.PI / 6, -Math.PI / 3);
    expect(result.x).toBeCloseTo(-0.4396797, 5);
    expect(result.y).toBeCloseTo(-0.02226, 5);
    expect(result.z).toBeCloseTo(-0.531975, 5);
    expect(result.w).toBeCloseTo(0.723317, 5);
  });

  it("should return normalized quaternion for arbitrary angles", () => {
    const result = eulerToQuaternion(1, 1, 1);
    const norm = Math.sqrt(
      result.x * result.x + result.y * result.y + result.z * result.z + result.w * result.w,
    );
    expect(norm).toBeCloseTo(1, 5);
  });
});
