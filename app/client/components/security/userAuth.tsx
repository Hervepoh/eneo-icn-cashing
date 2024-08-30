import { useSelector } from "react-redux";

export default function UserAuth() {
  const { user } = useSelector((state: any) => state.auth);

  if (user) {
    return console.log(true);
  } else {
    return console.log(false);
  }
}
