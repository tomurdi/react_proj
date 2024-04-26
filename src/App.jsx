import Message from "./Message";
import image from "../../personal_image.jpg"
import { createContext, useState, useEffect } from "react";
import ReactSwitch from "react-switch";
import { addQuestion, getQuestions, renderItems } from "./script";


export const ThemeContext = createContext(null);

const links = [
  {title: "Linkedin", content:"https://www.linkedin.com/in/thomas-urdinola/", image: "https://cdn.iconscout.com/icon/free/png-256/free-linkedin-162-498418.png"},
  {title: "Github" , content: "https://github.com/tomurdi", image: "https://cdn.iconscout.com/icon/free/png-512/free-github-1521500-1288242.png?f=webp&w=256"},
  {title: "WilderTrace Project" , content: "https://devpost.com/software/wild-stats", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2TN6tRGpXFZta5lQt-E-b_UHBse7PwTMcsoLBbtdyEQ&s"},
  {title: "Spotify", content: "https://open.spotify.com/user/taco_dude123?si=e52c490decfe47fd", image: "https://cdn.iconscout.com/icon/free/png-512/free-spotify-11-432546.png?f=webp&w=256"}
]

const projs = [
  {title: "WilderTrace", content: "Worked alongside 3 other people to win Best Educational Hack for Bitcamp 2022. Visualized animal migratory patterns throughout the sahara desert."},
  {title: "Crowmodel CNN", content: "Accompanied by 2 other people to simulate a Convolutional Neural Network. Managed to optimize our model's epochs and learning rates in order to minimize the amount of collisions from start to destination."},
  {title: "File Modifier", content: "Discussed with professional engineers at Freddie Mac to create a script that is able to move files to cloud-based databases, as well as restoring files that were incorrectly modified"},
  {title: "Form Verification", content: "Developed a script to check over 150+ weekly forms to see if certain program requirements were met for members in the College Success Scholars program."}
]

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function LinkInfo({title, content, image}) {
  return (
    <div className="link-sect">
      {/* <button className="buttons" onClick={content}>{title}</button> */}
      <a href={content}><img src={image} height={200}></img></a>
    </div>
  );
}

function Links() {
  return(

      <div>
        {links.map((element) => (
          <LinkInfo title={element.title} content={element.content} image={element.image} />
            )
          )
        }
      </div>
        
  );
}

function ProjInfo({title, content, num}) {
  return(
    <div className="proj-sect">
      <h2>Project {num}: {title}</h2>
      <p>{content}</p>
    </div>
  )
}

function Projects() {
  return (
    <div>
      {projs.map( (element,index) => (
            <ProjInfo title={element.title} content={element.content} num={index + 1}/>
          )
        )
      }
    </div>
  );
}

function NavBar() {
  return (
    <nav>
      <ol className="nav-links">
        <li className="buttons">
          <button onClick={() => scrollToSection('hobbies-section')}>Hobbies</button>
        </li>
        <li className="buttons">
          <button onClick={() => scrollToSection('projects-section')}>Projects</button>
        </li>
        <li className="buttons">
          <button onClick={() => scrollToSection('coolLinks-section')}>Cool Links</button>
        </li>
        <li className="buttons">
          <button onClick={() => scrollToSection('heads-or-tails')}>H or T</button>
        </li>
        <li className="buttons">
          <button onClick={() => scrollToSection('ask-me-anything')}>questions</button>
        </li>
      </ol>
    </nav>
  );
}

function Questions() {
  
}

function App() {
  const [theme, setTheme] = useState("light");
  const [side, setSide] = useState(0);
  const [count, setCount] = useState(0);
  const [heads, setHeads] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]);

  // useEffect(() => {
  //   renderItems(questions);
  // },[questions])

  function handleCoin () {
    const land = Math.round(Math.random())
    setSide(land)
    setCount(count + 1)
    handleHead(land)
  }

  function handleHead(arg) {
    if (arg == 1) {
      setHeads(heads + 1)
    }
  }
  
  function handleTheme() {
    setTheme((curr) => (curr == "light" ? "dark" : "light"))
  }

  const handleQuestion = () => {
    setName(''); // Reset name state to empty string
    setAge(''); // Reset age state to empty string
    setQuestion(''); // Reset question state to empty string
};

  return(
  <ThemeContext.Provider value={{theme, handleTheme}}>
  <div className="home-page" id={theme}>
    <Message></Message>
    <img src={image} alt="Myself" height={300}></img>
    <div className="switch">
      <ReactSwitch onChange={handleTheme} checked={theme=="dark"}/>
    </div>
    <NavBar></NavBar>

    <hr />

    <div className="intro" id="introduction">
    <h1>about me</h1>
      <p>Bienvenidos! My name is Thomas Urdinola, a CS + Cybersecurity major at the University of Maryland: College Park.
         Last summer, I had the opportunity to be a Software Engineer Intern with Freddie Mac, where I assisted in moving data 
         to a cloud-based model. Currently, I am a TA for CMSC330: Organization of Programming Languages, as well as an executive 
         team lead for the College Success Scholars program, a program that helps Black and Latino men get through college. 
         This upcoming summer, I am proud to announce that I'll be a Software Engineer Intern for Microsoft!!
      </p>
      

    </div>

    <div className="c2" id="projects-section">
      <h1 align="center">projects</h1>
      <Projects />


    </div>

    <div className="c3" id="hobbies-section">
      <h1 align="center">hobbies</h1>
      <p align="left">
        Outside of school, I like to mostly spend time with my friends and family. With my family, I mainly like to watch shows or eat food with them, as we go over our day.
        For my friends on the other hand, this could range from playing basketball to pool to exploring new places.
      </p>

      <p align="left">
        On the other hand, some of my personal hobbies include playing & watching soccer, going thrifting, and listening to music. I also love trying out new things!
        I try my best in stepping out my comfort zone, as I feel like that helps me. Additionally, I like to go on runs, and I try my best to stay active during the school year.
      </p>
      
    </div>

    <div id="coolLinks-section" className="c2">
      <h3> more about me!</h3>
      <Links />
    </div>

    <div id="heads-or-tails" className="c3">
      <h3>simple heads or tails generator in case if you're bored :)</h3>
      <p>{count == 0 ? "the coin hasn't been tossed yet" : side == 1 ? "coin landed on heads" : "coin landed on tails"}</p>
      <button onClick={handleCoin}>toss coin</button>
      <p>the coin has been tossed {count} times</p>
      <p>the coin has landed on heads {heads} times and tails {count - heads} times</p>
    </div>

    <div id="ask-me-anything" className="c1">
      <h2>speak yo mind</h2>
      <input type="text" value={name} id="name" onChange={(e) => setName(e.target.value)} placeholder="enter name"></input>
      <input type="number" value={age} id="age" onChange={(e) => setAge(e.target.value)} placeholder="enter age"></input>
      <input type= "text" value={question} id="question" onChange={(e) => setQuestion(e.target.value)} placeholder="enter question"></input>
      <button id="add-btn" onClick={handleQuestion}>ask</button>

      <ul id="question-list">
      </ul>
      <script src="script.js" defer></script>
    </div>
    
  </div>
  </ThemeContext.Provider>
  );
}

export default App;