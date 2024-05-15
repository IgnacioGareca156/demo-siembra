import { Box } from "@mui/system";
import ListAlumno from "./ListAlumno";
import { useContext, useState } from "react";
import { GlobalContext } from "../services/global.context";
import ListAdmin from "./ListAdmin";

export default function NavListDrawerResponsive({ onClick }) {
  const {state} = useContext(GlobalContext)
  const [user,setUser] = useState(state?.admin ? 'admin' : 'alumno')
  return (
    <Box
      sx={{ width: 250, pt: 8 }}
      // onClick={onClick}
    >
      
      {/* {user === 'alumno' && <ListAlumno/>} */}
      {user === 'admin' && <ListAdmin onClick={onClick}/>}
    </Box>
  );
}
