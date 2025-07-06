import { forwardRef } from "react";
import PropTypes from "prop-types";
import MDButtonRoot from "./MDButtonRoot";

const MDButton = forwardRef(({ color, variant, size, circular, iconOnly, children, ...rest }, ref) => (
  <MDButtonRoot
    {...rest}
    ref={ref}
    color="primary"
    variant={variant === "gradient" ? "contained" : variant}
    size={size}
    ownerState={{ color, variant, size, circular, iconOnly }}
  >
    {children}
  </MDButtonRoot>
));

// Add display name for ESLint
MDButton.displayName = "MDButton";

// Setting default values for the props of MDButton
MDButton.defaultProps = {
  size: "medium",
  variant: "contained",
  color: "info",
  circular: false,
  iconOnly: false,
};

// Typechecking props for the MDButton
MDButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "contained", "outlined", "gradient"]),
  color: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default MDButton;
