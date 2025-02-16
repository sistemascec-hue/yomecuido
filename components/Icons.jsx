import Foundation from "@expo/vector-icons/Foundation";
import Octicons from "@expo/vector-icons/Octicons";

export const MenuIcon = (props) => (
  <Foundation name="list" size={40} color="black" {...props} />
);

export const MoonIcon = (props) => (
  <Octicons name="moon" size={24} color="black" {...props} />
);

export const UserIcon = (props) => (
  <Octicons name="feed-person" size={24} color="black" {...props} />
);

export const LockIcon = (props) => (
    <Foundation name="lock" size={30} color="black" {...props} />
)
export const EmailIcon = (props)=>(
  <Foundation name="mail" size={24} color="black" {...props} />
)