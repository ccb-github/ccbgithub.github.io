import clsx from 'clsx';
import CSS from 'csstype';
import { ButtonHTMLAttributes } from 'react';
//TODO className 
export default  function NormalButton({
  onClick = () => {},
  id,
  text,
  dataId,
  type = "button",
  children,
  disabled,
  value,
  className = "",
  backgroundColor = "blue",
  ...otherProps
}: {
  onClick?: () => void;
  text?: string;
  dataId?: any,
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  id?: string;
  value?: string;
  backgroundColor?: CSS.Property.Color
}) {
  return (
    <button
      type={type}
      id={id}
      value={value}
      onClick={onClick}
      data-id={dataId}
      disabled={disabled}
      style={{
        backgroundColor: disabled? "whitesmoke" :  backgroundColor
      }}
      className={clsx(`
        space-x-2 rounded-lg 
        px-3 py-1 text-sm font-medium text-black
        ${className}`,{
          "hover:bg-blue-500 hover:text-white": !disabled,

        })
      }  
    ><span>
      {text}
      {children}
      </span>
    </button>
  );
};
