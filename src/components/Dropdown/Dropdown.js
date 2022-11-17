import React from 'react';
import './Dropdown.css';
import { FaCaretDown, FaCaretUp, FaRegSquare, FaRegCheckSquare, FaTimes } from 'react-icons/fa'
const Dropdown = ({ name, items, isSingleSelect }) => {
  const [open, setOpen] = React.useState(false);
  const [selections, setSelections] = React.useState(new Set()); // stores the index of selected items 

  const handleClick = () => {
    setOpen(!open);
  };

  const addSelection = (i) => {
    var newSelections;

    // need to clear selections if single select dropdown
    isSingleSelect ? newSelections = new Set() : newSelections = new Set(selections);
    newSelections.add(i)
    setSelections(newSelections)

    if (isSingleSelect)
      handleClick(); // close the dropdown when selection is made
  };

  const removeSelection = (i) => {
    var newSelections;
    isSingleSelect ? newSelections = new Set() : newSelections = new Set(selections);
    newSelections.delete(i)
    setSelections(newSelections);
  };

  const addAll = () => {
    var newSelections = new Set()
    for (let i = 0; i < items.length; i++)
      newSelections.add(i)
    setSelections(newSelections);
  };

  const removeAll = () => {
    setSelections(new Set());
  };

  return (
    <div className="dropdown" data-testid="Dropdown">
      <div className='dropdown-button' onClick={handleClick}>
        {/* if there are any user selections, display user's selections at the top */}
        <div className='dropdown-selection-list'> {selections.size > 0 ? (
          items.map((item, i) => (selections.has(i) && (
            <button className="dropdown-selection-list-item" key={i} onClick={(e) => { removeSelection(i); e.stopPropagation(); }}>
              {item}
              <div className='dropdown-selection-list-item-close icon'><FaTimes /></div>
            </button>
          )))
        ) : <div className='dropdown-selection-placeholder'> {name || "Select"}</div>}
        </div>

        {/*  caret icon */}
        <div className='dropdown-button-caret icon'>
          {open ? <FaCaretDown /> : <FaCaretUp />}
        </div>
      </div>

      {/* if dropdown is open, display dropdown list items */}
      {open && (<div className="dropdown-list">
        {/* select or deselect all */}
        {selections.size == 0 && !isSingleSelect && (
          <button className="dropdown-list-item" onClick={addAll}>
            <div className="dropdown-list-item-icon icon"><FaRegSquare /></div>
            <em> Select All</em>
          </button>
        )}
        {selections.size > 0 && !isSingleSelect && (
          <button className="dropdown-list-item" onClick={removeAll}>
            <div className="dropdown-list-item-icon icon"><FaRegCheckSquare /></div>
            <em> Deselect All</em>
          </button>
        )}

        {/* display list items */}
        {items.map((item, i) => (
          isSingleSelect ? (
            // single selection (no checkbox displayed, no "click to remove")
            <button className="dropdown-list-item" key={i} onClick={() => addSelection(i)}>
              {item}
            </button>
          ) :
            selections.has(i) ? (
              // multiselection and the item is selected, so clicking on it removes the selection
              <button className="dropdown-list-item" key={i} onClick={() => removeSelection(i)}>
                <div className="dropdown-list-item-icon icon"><FaRegCheckSquare /></div>
                {item}
              </button>
            ) : (
              // multiselection and the item is not selected, so clicking on it adds the selection
              <button className="dropdown-list-item" key={i} onClick={() => addSelection(i)}>
                <div className="dropdown-list-item-icon icon"><FaRegSquare /></div>
                {item}
              </button>
            )))
        }
      </div>)}
    </div>
  );
}

export default Dropdown;
