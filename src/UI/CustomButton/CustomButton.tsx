import type {ButtonHTMLAttributes, FC, ReactElement } from 'react';
import { Button, type ButtonProps } from '@mantine/core';
import { Loader } from '@mantine/core';
interface CustomButtonProps extends ButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'style'> {
    children: ReactElement;
    isPending?: boolean;
    isSecondButton?: boolean
}
const CustomButton:FC<CustomButtonProps> = ({children, isPending = false, isSecondButton = false, ...buttonProps}) => {
    return (
        <Button variant="filled" {...buttonProps} color={isSecondButton ? 'gray' : 'roseRed'} >
            <div className='flex gap-2 items-center justify-center'>
                {isPending && <Loader size={16} />}
                {children}
            </div>
        </Button>
    )
}
export default CustomButton