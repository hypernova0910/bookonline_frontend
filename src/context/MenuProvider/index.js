import React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import Divider from '@mui/material/Divider';

import { useRouteMatch } from "react-router-dom";

import ProductGroupService from '../../service/ProductGroupService'

import {Link, useNavigate} from 'react-router-dom'

import CommonFunction from '../../common/CommonFunction';

export default function SwipeableTemporaryDrawer({children, ...props}) {
    const [open, setOpen] = React.useState(false);

    let isNodeExpanded = false

    const [nodes, setNodes] = React.useState({})

    const navigate = useNavigate();

    React.useEffect(() => {
      ProductGroupService.getAll().then((res) => {
          let nodesTemp = {}
          for(let datum of res.data){
            //console.log({[datum.id + ''] : datum.name})
            // setNodes({ ...nodes, 
            //   [datum.id + ''] : datum.name
            // })
            nodesTemp[datum.id + ''] = 
            {
              name: datum.name, 
              parent_id: datum.parent_group ? datum.parent_group.id : null, 
            }
          }
          //console.log(res.data)
          setNodes(nodesTemp)
      })
    }, [])

  const toggleDrawer = (open_) => (event) => {
    if(isNodeExpanded){
      isNodeExpanded = false;
      return
    }
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    //setState({ ...state, [anchor]: open });
    setOpen(open_)
  };

  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    //event.preventDefault();
    
    if(event.target.classList.contains('MuiTreeItem-label')){
      event.preventDefault()
    }
    else{
      isNodeExpanded = true
      setExpanded(nodeIds);
    }
    
    //console.log(nodeIds)
  };

  const getLink = (nodeId) => {
    if(nodeId == null){
      return ''
    }
    return getLink(nodes[nodeId].parent_id) + '/' + CommonFunction.removeAccents(nodes[nodeId].name).toLowerCase().replaceAll(' ', '-')
  }

  const handleSelect = (event, nodeId) => {
    //event.preventDefault();
    console.log(event.target.classList)
    setSelected(nodeId);
    if(nodeId == 'Home'){
      navigate('/')
    }
    else{
      if(event.target.classList.contains('MuiTreeItem-label')){
        navigate(getLink(nodeId))
      }
    }
    
  };

  const getTreeItem = (parent_id) => {
      return Object.entries(CommonFunction.filterObj(nodes, node => node.parent_id == parent_id)).map(([key, value]) => 
      <TreeItem
      collapseIcon={<ChevronRightIcon />}
      expandIcon={<ExpandMoreIcon />}
      key={key} nodeId={key + ''} label={value.name}>
        {getTreeItem(key + '')}
      </TreeItem>
  )
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <TreeView
        aria-label="controlled"
        // defaultCollapseIcon={<ExpandMoreIcon />}
        // defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        sx={{
          '& .MuiTreeItem-root' : {
            '& .MuiTreeItem-content' : {
              padding: '8px 20px',
              '& .MuiTreeItem-label' : {
                margin: 0,
                fontFamily: 'Roboto',
                fontWeight: 400,
                fontSize: '1.2rem',
                lineHeight: 1.5,
                letterSpacing: '0.00938em',
                display: 'block'
              }
            }
          }
          
        }}
      >
        <TreeItem nodeId={'Home'} label={'Trang chủ'}/>
        <Divider/>
        {getTreeItem(null)}

      </TreeView>
    </Box>
  );

  return (
    <MenuContext.Provider value={{toggleDrawer, nodes, getLink}}>
        {children}
        <SwipeableDrawer
        anchor='left'
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        >
        {list('left')}
        </SwipeableDrawer>
    </MenuContext.Provider>
  );
}

export const MenuContext = React.createContext(null);