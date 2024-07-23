import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { ELocalStorageKeys } from '../../global/enums';
import * as PublicDataService from '../../services/PublicDataService';

export default function ContentLikeButton(props: { contentId: string }) {
  const localValue = localStorage.getItem(`${ELocalStorageKeys.LIKED_CONTENTS}:${props.contentId}`);
  const [liked, setLiked] = useState<boolean>(Boolean(localValue));
  function handleLikeContent() {
    PublicDataService.likeContent(props.contentId).then(response => {
      if (response.data) {
        localStorage.setItem(`${ELocalStorageKeys.LIKED_CONTENTS}:${props.contentId}`, response.data);
        setLiked(true);
      }
    });
  }
  return liked ? (
    <IconButton disabled>
      <FavoriteIcon sx={{ color: 'red' }} />
    </IconButton>
  ) : (
    <IconButton onClick={handleLikeContent}>
      <FavoriteBorderIcon sx={{ color: 'red' }} />
    </IconButton>
  );
}
