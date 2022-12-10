import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const Redirect = (props: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.to) {
      console.log(props.to);
      navigate(props.to);
    }
  });

  return <></>;
};
