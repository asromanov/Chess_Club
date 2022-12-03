import React from 'react';
import {
  List, ListItem, ListItemText, ListItemAvatar, Avatar, Button,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
// import { useSelector } from 'react-redux';

export default function OnlinePlayersPage() {
  // const users = useSelector((state) => state.players.friendsOnline);
  const users = [{ name: 'user1' }, { name: 'user2' }, { name: 'user' }];
  console.log(users);
  return (
    <>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {users?.map((el) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${el?.name}`} />
          </ListItem>
        ))}
      </List>
      {users.includes(user?.id)
        ? <Button>Пригласить</Button>
        : (
          <>
            <Button>Принять</Button>
            <Button>Отклонить</Button>
          </>
        )}
    </>
  );
}
