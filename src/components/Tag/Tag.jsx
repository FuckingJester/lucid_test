import React from 'react';
import useStore from '../../store/store.js';
import styles from './Tag.module.css'

const TagInput = ({ tag, index }) => {
  const { formula, setFormula } = useStore();
  const deleteTag = (index) => {
    const newFormula = [...formula];
    newFormula.splice(index, 1);
    setFormula(newFormula);
  };

  const editTag = (index, newTag) => {
    const newFormula = [...formula];
    newFormula[index] = newTag;
    setFormula(newFormula);
  };

  return (
    <span className={styles.tag}>
      <input
        type="text"
        value={tag}
        onChange={(e) => editTag(index, e.target.value)}
      />
      <button onClick={() => deleteTag(index)}>X</button>
    </span>
  );
};

export default TagInput