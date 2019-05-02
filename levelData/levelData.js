import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page3 from './components/Page3';

export const levelData = {
  '1': {
    numberOfPages: 5,
    pageComponent: Page1
  },
  '2': {
    numberOfPages: 5,
    pageComponent: Page2
  },
  '3': {
    numberOfPages: 5,
    pageComponent: Page3
  },
};

export const levelMetadata = [
  {
    id: "1",
    title: "What is a Computer Graphics ?",
    description: "Learn about applications of Computer Graphics",
    available: true
  },
  {
    id: "2",
    title: "Math + Graphics",
    description: "Learn About the integration of computer graphics and linear algebra.",
    available: false
  },
  {
    id: "3",
    title: "Interaction of Math and Pixels",
    description: "Learn about pixels",
    available: false
  },
];
