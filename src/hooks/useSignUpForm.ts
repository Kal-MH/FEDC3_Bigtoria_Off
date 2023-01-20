import dayjs, { Dayjs } from 'dayjs';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signin } from '../apis/auth';
import { postSignUp } from '../apis/signup';
import { CHANNEL_ID } from '../constants/apiParams';
import { getDateInfo } from '../utils/helpers';
import { signUpIsValid } from '../utils/signUpIsValid';
import { signUpValidate } from '../utils/signUpValidate';
import { postStory } from './../apis/story';
import { ROUTES } from './../constants/routes';

const error = {
  fullName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  date: '',
  job: '',
};

const initialState = {
  fullName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  date: getDateInfo(dayjs(new Date())),
  job: '',
};

const today = dayjs(new Date());

const useSignUpForm = () => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(error);
  const [date, setDate] = useState<Dayjs | null>(today);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value.replace(/\s/g, '') });
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
    if (newValue) setValues({ ...values, date: getDateInfo(newValue) });
  };

  const generateFormData = () => {
    const formData = new FormData();
    formData.append(
      'title',
      JSON.stringify({
        storyTitle: `${values.fullName}님 탄생일`,
        year: values.date.year,
        month: values.date.month,
        day: values.date.day,
        content: '🥳 해삐 바쓰데이 🎉',
      })
    );
    formData.append('channelId', CHANNEL_ID);
    return formData;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newError = signUpValidate(values);
    setErrors(newError);

    if (signUpIsValid(newError)) {
      setIsLoading(true);
      try {
        await postSignUp(values);
        await signin({ email: values.email, password: values.password });
        const formData = generateFormData();
        await postStory(formData);
        navigate(ROUTES.HOME);
        setTimeout(function () {
          alert('가입이 완료되었습니다.');
        }, 0);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    values,
    isLoading,
    date,
    handleSubmit,
    handleChange,
    handleDateChange,
    errors,
  };
};

export default useSignUpForm;
