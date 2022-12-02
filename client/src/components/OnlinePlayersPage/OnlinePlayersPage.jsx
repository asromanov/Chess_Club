import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  List, ListItem, ListItemText, ListItemAvatar, Avatar, Button,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { setPlayersListAsync } from '../../redux/actions/playersActions';

export default function OnlinePlayersPage() {
  const user = useSelector((state) => state.authUser);
  const { friendsOnline = [] } = useSelector((state) => state.players);
  const dispatch = useDispatch();
  console.log(friendsOnline);

  useEffect(() => {
    dispatch(setPlayersListAsync(user.id));
  }, []);

  return (
    <>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {friendsOnline?.map((el) => (
          <ListItem key={el?.id}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${el?.name}`} />
          </ListItem>
        ))}
      </List>
      <Button>Пригласить</Button>
      <Button>Принять</Button>
      <Button>Отклонить</Button>
      {/* {users.includes(user.id)
        ? <Button>Пригласить</Button>
        : (
          <>
            <Button>Принять</Button>
            <Button>Отклонить</Button>
          </>
        )} */}
    </>
  );
}
