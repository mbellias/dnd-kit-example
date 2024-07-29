'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  MouseSensor,
  TouchSensor,
  useSensors,
  UniqueIdentifier,
  useSensor,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export enum ItemType {
  SIDEBAR_ITEM = 'SIDEBAR_ITEM',
}

interface DndState {
  items: UniqueIdentifier[];
  addItem: (id: UniqueIdentifier) => void;
  moveItem: (oldIndex: number, newIndex: number) => void;
}

export const useDnd = create<DndState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (id) => set((state) => ({ items: [...state.items, id] })),
      moveItem: (oldIndex, newIndex) =>
        set((state) => ({ items: arrayMove(state.items, oldIndex, newIndex) })),
    }),
    {
      name: 'dnd-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useSensorsStore = () => {
  return useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );
};
