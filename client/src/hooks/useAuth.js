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
      basalInsulin: null,
      bolusInsulin: null,
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
    basalInsulin,
    bolusInsulin,
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
    basalInsulin,
    bolusInsulin,
    anamnesis,
  };
}
