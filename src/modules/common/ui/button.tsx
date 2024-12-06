import { Button as UiButton, ButtonProps } from "@telegram-apps/telegram-ui";

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <UiButton
      className={
        "bg-transparent border border-solid border-white/20 rounded " +
        className
      }
      {...props}
    >
      {children}
    </UiButton>
  );
};
