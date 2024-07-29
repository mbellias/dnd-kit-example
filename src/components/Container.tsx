'use client';

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';

const containerStyle = {
  background: '#dadada',
  padding: 10,
  margin: 10,
  flex: 1,
};

export default function Container({
  id,
  items,
}: {
  id: string;
  items: string[];
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        style={containerStyle}
      >
        {items.map((item) => (
          <SortableItem
            key={item}
            id={item}
          />
        ))}
      </div>
    </SortableContext>
  );
}
