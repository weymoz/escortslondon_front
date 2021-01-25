/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { components } from 'react-select';

import Arrow from '@svg/arrow-down.svg';
import Location from '@svg/location-select.svg';
import Price from '@svg/price-select.svg';
import Services from '@svg/services-select.svg';
import Physical from '@svg/physical-select.svg';
import Check from '@svg/check.svg';

const chooseIcon = placeholder => {
  switch (placeholder) {
    case 'Location':
      return <Location />;
    case 'Price / Hour':
      return <Price />;
    case 'Services':
      return <Services />;
    case 'Physique':
      return <Physical />;
    default:
      return null;
  }
};

export const AddressesMenu = props => {
  const options = props.options.filter(option => {
    const filter = new RegExp(`^Flat 7`, 'i');
    return filter.test(option.value);
  });
  const newProps = { ...props, selectProps: { ...props.selectProps, options } };
  return (
    <div>
      <div>TEST</div>
      <components.Menu {...newProps}>{props.children}</components.Menu>
    </div>
  );
};

export const Input = props => {
  return <components.Input {...props} />;
};

export const ControlIcon = props => {
  const { selectProps, menuIsOpen } = props;
  const iconStyle = {
    position: 'absolute',
    top: '50%',
    left: '12px',
    transform: 'translateY(-50%)',
    zIndex: '10',
    color: menuIsOpen ? 'var(--primary)' : 'inherit',
    opacity: menuIsOpen ? '1' : '.7',
    transition: 'all .3s ease-in-out',
  };
  return (
    <div>
      <span style={iconStyle}>{chooseIcon(selectProps.placeholder)}</span>
      <components.Control {...props} />
    </div>
  );
};

export const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <Arrow />
  </components.DropdownIndicator>
);

export const PriceMenuList = props => {
  return (
    <components.MenuList {...props}>
      <span
        style={{
          paddingTop: 10,
          color: '#777',
          fontStyle: 18,
          textAlign: 'center',
          display: 'block',
        }}
      >
        Price / Hour
      </span>

      {props.children}
    </components.MenuList>
  );
};

export const Option = props => {
  const { label, isSelected } = props;

  const checkboxStyle = {
    width: '14px',
    height: '14px',
    backgroundColor: 'transparent',
    border: '2px solid var(--borderColor)',
    marginRight: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all .3s ease-in-out',
  };
  const checkmark = {
    opacity: isSelected ? '1' : '0',
  };
  return (
    <components.Option {...props}>
      <div style={checkboxStyle}>
        <span style={checkmark}>
          <Check />
        </span>
      </div>
      {label}
    </components.Option>
  );
};

export const PriceOption = props => {
  const { label, isSelected } = props;

  const checkboxStyle = {
    width: '14px',
    height: '14px',
    backgroundColor: 'transparent',
    border: '2px solid var(--borderColor)',
    marginRight: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all .3s ease-in-out',
  };
  const checkmark = {
    opacity: isSelected ? '1' : '0',
  };
  return (
    <components.Option {...props}>
      <div style={checkboxStyle}>
        <span style={checkmark}>
          <Check />
        </span>
      </div>
      {'£' + label}
    </components.Option>
  );
};
export const MultiValueContainer = props => {
  const { selectProps } = props;
  const dotStyle = {
    backgroundColor: 'var(--gray400)',
    width: '3px',
    height: '3px',
    margin: '0 8px',
    borderRadius: '50%',
  };
  return (
    <components.MultiValueContainer {...props}>
      {`${selectProps.placeholder}`}
      <span style={dotStyle} />
      {`${selectProps.value.length}`}
    </components.MultiValueContainer>
  );
};

export const GroupHeading = props => {
  const { children } = props;
  const styleHead = {
    fontWeight: '600',
    color: 'var(--black)',
    marginBottom: '6px',
    fontSize: 'var(--fsS)',
  };
  const styleGroup = {
    marginBottom: '18px',
  };
  return (
    <components.GroupHeading {...props}>
      <div style={styleHead}>{children}</div>
    </components.GroupHeading>
  );
};

export const customStyle = {
  control: styles => ({
    ...styles,
    backgroundColor: 'var(--gray700)',
    color: 'rgba(255,255,255,.7)',
    height: '46px',
    border: 'none',
    borderRadius: '0',
    boxShadow: 'none',
    cursor: 'pointer',
    ':active': {
      border: 'none',
      boxShadow: 'none',
    },
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    color: 'var(--black)',
    backgroundColor: isSelected ? 'var(--white)' : null,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '--borderColor': 'var(--gray400)',
    ':hover': {
      '--borderColor': 'var(--primary)',
    },
    ':active': {
      backgroundColor: 'var(--white)',
    },
  }),
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none',
  }),
  placeholder: styles => ({
    ...styles,
    color: 'var(--gray300)',
    left: '34px',
    margin: '0',
    fontSize: 'var(--fsS)',
  }),
  multiValue: styles => ({
    ...styles,
    color: 'var(--gray300)',
    fontWeight: '500',
    backgroundColor: 'var(--gray700)',
    position: 'absolute',
    top: '50%',
    left: '34px',
    transform: 'translateY(-50%)',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    margin: '0',
  }),
  multiValueContainer: styles => ({
    ...styles,
    display: 'flex',
    alignItems: 'center',
  }),
  multiValueLabel: styles => ({
    ...styles,
    display: 'none',
  }),
  clearIndicator: styles => ({
    ...styles,
    display: 'none',
  }),
  menu: styles => ({
    ...styles,
    borderRadius: 'none',
    color: 'var(--black)',
    margin: '0',
  }),
  singleValue: styles => ({
    ...styles,
    color: 'var(--white)',
    paddingLeft: '16px',
  }),
};

export const customSelectStyle = {
  ...customStyle,
  indicatorsContainer: styles => ({
    ...styles,
    paddingRight: '8px',
  }),
  placeholder: styles => ({
    ...styles,
    left: '16px',
    fontSize: 'var(--fsS)',
  }),
};

export const customSelectCodeStyle = {
  ...customStyle,
  singleValue: styles => ({
    ...styles,
    paddingLeft: '6px',
    color: 'var(--white)',
  }),
  placeholder: styles => ({
    ...styles,
    left: '16px',
    fontSize: 'var(--fsS)',
  }),
};

export const physicalStyle = {
  option: (styles, { isSelected }) => {
    console.log(isSelected);
    return {
      ...styles,
      backgroundColor: isSelected ? 'var(--gray700)' : 'var(--gray300)',
      color: isSelected ? 'var(--white)' : 'var(--black)',
      display: 'inline-block',
      marginRight: '6px',
      marginBottom: '6px',
      padding: '7px 8px',
      width: 'auto',
      fontWeight: '600',
      fontSize: 'var(--fsXS)',
      cursor: 'pointer',
      transition: 'all .3s ease-in-out',
      ':hover': {
        color: 'var(--primary)',
      },
    };
  },
  control: styles => ({
    ...styles,
    backgroundColor: 'var(--gray700)',
    color: 'rgba(255,255,255,.7)',
    height: '46px',
    border: 'none',
    borderRadius: '0',
    boxShadow: 'none',
    cursor: 'pointer',
    ':active': {
      border: 'none',
      boxShadow: 'none',
    },
  }),
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none',
  }),
  placeholder: styles => ({
    ...styles,
    color: 'var(--gray300)',
    left: '34px',
    margin: '0',
  }),
  multiValue: styles => ({
    ...styles,
    color: 'var(--gray300)',
    fontWeight: '500',
    backgroundColor: 'var(--gray700)',
    position: 'absolute',
    top: '50%',
    left: '34px',
    transform: 'translateY(-50%)',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    margin: '0',
  }),
  multiValueContainer: styles => ({
    ...styles,
    display: 'flex',
    alignItems: 'center',
  }),
  multiValueLabel: styles => ({
    ...styles,
    display: 'none',
  }),
  clearIndicator: styles => ({
    ...styles,
    display: 'none',
  }),
  menu: styles => ({
    ...styles,
    borderRadius: 'none',
    color: 'var(--black)',
    margin: '0',
    padding: '10px 16px 0',
    //width: "calc(100% + 167px)"
  }),
  group: styles => ({
    ...styles,
    margin: '0 0 18px',
    padding: '0',
  }),
  groupHeading: styles => ({
    ...styles,
    padding: '0',
    textTransform: 'capitalize',
  }),
};

// basic select style for make a date

export const styles = {
  input: styles => ({
    ...styles,
    color: 'var(--white)',
    fontWeight: '600',
    fontSize: 'var(--fsS)',
  }),
  control: styles => ({
    ...styles,
    backgroundColor: 'var(--gray700)',
    color: 'rgba(255,255,255,.7)',
    height: '46px',
    border: 'none',
    borderRadius: '0',
    boxShadow: 'none',
    cursor: 'pointer',
    padding: '0 4px',
    fontSize: 'var(--fsS)',
    ':active': {
      border: 'none',
      boxShadow: 'none',
    },
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    color: isSelected ? 'var(--primary)' : 'var(--black)',
    backgroundColor: isSelected ? 'var(--gray300)' : null,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '--borderColor': 'var(--gray400)',
    ':hover': {
      backgroundColor: 'var(--gray300)',
      color: 'var(--primary)',
    },
    ':active': {
      backgroundColor: 'var(--white)',
    },
  }),
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none',
  }),
  clearIndicator: styles => ({
    ...styles,
    display: 'none',
  }),
  menu: styles => ({
    ...styles,
    borderRadius: 'none',
    color: 'var(--black)',
    margin: '0',
    zIndex: 10,
  }),
  singleValue: styles => ({
    ...styles,
    color: 'var(--white)',
  }),
  placeholder: styles => ({
    ...styles,
    color: 'var(--placeholder)',
    fontWeight: '500',
  }),
};

// casting styles

export const castingStyles = {
  ...styles,
  option: (styles, { isSelected }) => ({
    ...styles,
    color: isSelected ? 'var(--primary)' : 'var(--black)',
    backgroundColor: isSelected ? 'var(--gray300)' : null,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    '--borderColor': 'var(--gray400)',
    ':hover': {
      backgroundColor: 'var(--gray300)',
      color: 'var(--primary)',
    },
    ':active': {
      backgroundColor: 'var(--white)',
    },
    paddingLeft: '36px',
    ':before': {
      content:
        'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAKCAYAAABv7tTEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB4SURBVHgBpdDBCYAwDAXQpBeX0OIqjmAdQDdRN+kEDuUWtdrYFpRCoUT8EMgh7/ADwIyt1WylmsMuuIAQFgeAnPsIjkaRkWr5B045jGHYwEdc5DpHpFP4dPCzVvuWoVjMNL1GwFEgTuSoLYEXpTDsJZAlQPaXvuYG5jtDFoqRHjEAAAAASUVORK5CYII=")',
      position: 'absolute',
      left: '16px',
      top: '50%',
      opacity: isSelected ? '1' : '0',
      transform: 'translateY(-50%)',
    },
  }),
};
