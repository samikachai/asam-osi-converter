import type { SceneEntity, SceneEntityDeletion } from "@foxglove/schemas";
import { SceneEntityDeletionType } from "@foxglove/schemas";
import type { Time } from "@foxglove/schemas/schemas/typescript/Time";
import type { DeepPartial } from "ts-essentials";

export type PartialSceneEntity = DeepPartial<SceneEntity> & { id: string };

export function buildSceneEntityDeletions(time: Time = { sec: 0, nsec: 0 }): SceneEntityDeletion[] {
  return [
    {
      id: "",
      timestamp: time,
      type: SceneEntityDeletionType.ALL,
    },
  ];
}
