import { useSelector } from 'react-redux';

export function useAuth() {
  const user = useSelector(state => state.user.user);

  if (!user) {
    return {
      isAuth: false,
      email: null,
      name: null,
      surname: null,
      gender: null,
      dateOfIllness: null,
      id: null,
      avatarUrl: null,
      longActingInsulin: null,
      rapidActingInsulin: null,
      anamnesis: null,
    };
  }

  const {
    email,
    name,
    surname,
    gender,
    dateOfIllness,
    _id,
    avatarUrl,
    longActingInsulin,
    rapidActingInsulin,
    anamnesis,
  } = user;

  return {
    isAuth: true,
    email,
    name,
    surname,
    gender,
    dateOfIllness,
    id: _id,
    avatarUrl,
    longActingInsulin,
    rapidActingInsulin,
    anamnesis,
  };
}
