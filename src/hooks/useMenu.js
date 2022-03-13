import { useContext } from "react";
import { MenuContext } from "../context/MenuProvider";

export default function useMenu(){
    const {toggleDrawer, nodes, getLink} = useContext(MenuContext)

    return {
        toggleDrawer, nodes, getLink
    }
}