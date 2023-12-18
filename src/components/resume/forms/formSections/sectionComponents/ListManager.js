import React, { useState } from 'react';
import '../../css/list.css';

function ListManager({
  items,
  onItemChange,
  itemType,
  limit,
  renderFields,
}) {
  const [localItems, setLocalItems] = useState(items);

  const handleAddItem = () => {
    if (localItems.length < limit) {
      setLocalItems([...localItems, {}]);
      onItemChange([...localItems, {}]);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...localItems];
    updatedItems.splice(index, 1);
    setLocalItems(updatedItems);
    onItemChange(updatedItems);
  };

  return (
    <div>
      <h2>{itemType} List</h2>
      {localItems.map((item, index) => (
        <div key={index}>
          {renderFields(item, index)}
          <button className="list-button" onClick={() => handleRemoveItem(index)}>Remove</button>
        </div>
      ))}

      {localItems.length < limit && (
        <button className="list-button" onClick={handleAddItem}>Add</button>
      )}
    </div>
  );
}

export default ListManager;
