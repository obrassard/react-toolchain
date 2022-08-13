import styled from "@emotion/styled";
import React from "react";
import { IconType } from "react-icons";

type IconButtonProps = {
  width?: number;
  height?: number;
  Icon: IconType;
  iconSize?: number;
  color?: string;
  className?: string;
  disabled?: boolean;
  title?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<any>) => void;
};

const Button = styled.button<{ width?: number; height?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-width: 0;
  line-height: 1;
  background-color: transparent;
  border-radius: 50%;
  width: ${({ width }) => (width ? width : 32)}px;
  height: ${({ height }) => (height ? height : 32)}px;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #87ceeb;
  }
`;

const IconButton = ({
  height,
  width,
  iconSize,
  Icon,
  color,
  disabled,
  type = "button",
  ...props
}: IconButtonProps) => (
  <Button
    {...props}
    height={height}
    width={width}
    disabled={disabled}
    type={type}
  >
    <Icon
      size={iconSize ?? 24}
      color={disabled ? "#BBBBBB" : color ?? "#222222"}
    />
  </Button>
);

export default IconButton;
