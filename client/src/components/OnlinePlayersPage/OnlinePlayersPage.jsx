import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  List, ListItem, ListItemText, ListItemAvatar,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { setFriendsListAsync } from '../../redux/actions/friendsActions';
import BadgeAvatar from './BadgeAvatar';

export default function OnlinePlayersPage() {
  const authUser = useSelector((state) => state.authUser);
  console.log(authUser);
  const { friendsList = [], friendsOnline = [] } = useSelector((state) => state.friends);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFriendsListAsync());
  }, []);

  return (
    <List style={{ margin: '50px', backgroundColor: 'inherit' }} sx={{ width: '100%' }}>
      {friendsList?.map((friend) => {
        const isOnline = friendsOnline?.map((el) => el.id).includes(friend.id);
        return (
          <ListItem key={friend?.id}>
            <ListItemAvatar>
              <BadgeAvatar alt={`${friend.name}`} src="" isOnline={isOnline}>
                <ImageIcon />
              </BadgeAvatar>
            </ListItemAvatar>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <ListItemText primary={`${friend?.name}`} />
            </div>
          </ListItem>
        );
      })}
    </List>
  );
}
