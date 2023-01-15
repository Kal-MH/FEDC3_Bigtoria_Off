import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/shared/Header';
import ScrollToTop from './components/shared/ScrollToTop';
import { ROUTES } from './constants/routes';
import NotFound from './pages/404';
import Chat from './pages/Chat';
import Home from './pages/Home';
import Notification from './pages/Notification';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Story from './pages/Story';
import StoryBook from './pages/StoryBook';
import StoryEdit from './pages/StoryEdit';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.STORY_BOOK} element={<StoryBook />} />
        <Route path={ROUTES.NOTIFICATION} element={<Notification />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route path={ROUTES.SIGNIN} element={<SignIn />} />
        <Route path={ROUTES.STORY} element={<Story />} />
        <Route path={ROUTES.STORY_EDIT} element={<StoryEdit />} />
        <Route path='*' element={<NotFound />} />
        <Route path={ROUTES.CHAT} element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
