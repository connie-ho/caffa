/* eslint-disable no-use-before-define */
import React, {useContext, useEffect, useState} from 'react';
import DataContext from '../../contexts/DataContext'

import useAutocomplete from '@material-ui/lab/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

const Tag = styled(({ label, onDelete, ...props }) => (
  <div {...props}>
    <span>{label}</span>
    <CloseIcon onClick={onDelete} />
  </div>
))`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Listbox = styled('ul')`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;

export default function RegionSearch(props) {

  const {state} = useContext(DataContext);

  const {
    filters, 
    setFilters,
    handleFilters,
    regions
  } = props; 
  const category = 'region';
  
  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'region-search',
    defaultValue: [],
    multiple: true,
    options: regions,
    getOptionLabel: (option) => option.type,
  });

  const handleChange = (event, optionId) => {
    
    const currIndex = filters[category].indexOf(optionId) //checks if filter is already applied
    const newCategory = [...filters[category]]; // initalize new state

    if (currIndex === -1){
      newCategory.push(optionId) // if not already in array, add
    } else {
      newCategory.splice(currIndex, 1) // remove if in the array
    }

    const newFilter = {
      ...filters, 
      [category]: newCategory
    }
    setFilters(prev => newFilter)
    handleFilters(newFilter);
  };
  
  console.log(value)

  return (
    <NoSsr>
      <div>
        <div {...getRootProps()}>
          <div 
            ref={setAnchorEl} 
            className={focused ? 'focused' : ''}
            >
            {value.map((option, index) => (
              <Tag 
                onClick={(e)=>{handleChange(e,option.id)}}
                label={option.type} {...getTagProps({ index })} 
              />
              ))}
            <input 
            {...getInputProps()} 
            />
          </div>
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}
          >
            {groupedOptions.map((option, index) => (
              <li 
              {...getOptionProps({ option, index })}
              >
                <span
                  onClick={(e)=>{handleChange(e,option.id)}}
                >{option.type}</span>
                <CheckIcon fontSize="small" />
              </li>
            ))}
          </Listbox>
        ) : null}
      </div>
    </NoSsr>
  );
}