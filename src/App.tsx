import './App.css'
import Header from './UI/Header';
import InvestmentForm from './components/InvestmentForm';
// import componentsImage from './assets/images/components.png';
// import stateImage from './assets/images/state.png';
// import eventsImage from './assets/images/events.png';


// const concepts = [
//   {
//     title: 'Components',
//     image: componentsImage,
//     description:
//       'Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Components can receive data via props, and they can render dynamic output using JSX.',
//   },
//   {
//     title: 'State',
//     image: stateImage,
//     description:
//       'State is data that may change over time. As it changes, the UI should be updated to reflect the updated data. Each component can maintain its own state and multiple components can share state.',
//   },
//   {
//     title: 'Events',
//     image: eventsImage,
//     description:
//       'Event handlers are added via props to (built-in) components. You pass functions as values to such event handlers to control which functions gets executed for which event.',
//   },
// ];

export interface Screen {
  title: string;
  image: string;
  description: string;
}

function App() {
  return (
    <div>
      <Header />
      <ul id="screens">
        <li className="screen">
          <img src="TODO: IMAGE" alt="TODO: TITLE" />
          <h2>TODO: BANGIN</h2>
          <p>TODO: FIRE</p>
        </li>
      </ul>
      <InvestmentForm/>
    </div>
  );
};

export default App;
