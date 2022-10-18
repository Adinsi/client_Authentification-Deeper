import axios from 'axios';
import React, { useEffect,  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/pagesstyles/Home.scss';

import Navbar from '../component/Navbar';
import { setgetUsers } from '../features/user.reducers';
// import { dateParser, isempty } from '../component/Utils';
import FormPost from '../component/FormPost';
import { getAllPost } from '../features/post.reducers';
import ListPost from '../component/ListPost';




const Home = () => {
  const [loadPost, setloadPost] = useState(true)
  const [count, setcount] = useState(5);
  

  const user = useSelector(state => state.user.user);
  const users = useSelector((state) => state.users.users);
  const allPosts = useSelector((state) => state.posts.posts);
  
 


  const dispatch = useDispatch();
  // const form = useRef();
  // const sendEmail = (e) => {
  //   e.preventDefault();
  //   const message = document.getElementById("message");

  //   emailjs
  //     .sendForm(
  //       "service_o19gmcb",
  //       "template_ww95nbk",
  //       form.current,
  //       "eNbGuhHH13G4a2Mho"
  //     )
  //     .then(
  //       (result) => {
  //         message.innerHTML =
  //           "Votre requète à bien été envoyé , vous recevrez un email dans quelques instants";
  //         message.style.color = "green";
  //       },
  //       (error) => {
  //         message.innerHTML =
  //           "Réquète non traité, veuillez vérifier votre connexion internet et réessayer.";
  //         message.style.color = "red";
  //       }
  //     );
  // };

  

 
  const sendRquestPost = async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL_POST}`, {
      withCredentials: true
    })
      // .catch(err => console.log(err));
    const data = await res.data;
    return data;
  }

   
  const loadMore = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement) {
      setloadPost(true)
    }
  }
  
  const sendRquest = async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL_USER}jwt`, {
      withCredentials: true
    })
      // .catch(err => console.log(err));/
    const data = await res.data;
    return data;
  }

 

  useEffect(() => {
    if (loadPost) {
        sendRquestPost().then(() => {
           dispatch(getAllPost());
          setloadPost(false);
          setcount(count+5)
           

    })
    }
    window.addEventListener('scroll', loadMore
    );
    return window.removeEventListener('scroll',loadMore)
  

      
   },[loadPost  , dispatch])
  
  useEffect(() => {
      sendRquest().then((data) => {
        dispatch(setgetUsers(data.user))
      })
})
  
  
    return (
      <>
        {
          user && 
            <>
        
            <Navbar />
        <br></br>
            
         <section id="hero" className="hero d-flex align-items-center">
    <div className="container">
      <div className="row gy-4 d-flex justify-content-between">
        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <h2 data-aos="fade-up" style={{textTransform:'Uppercase'}}>Bienvennue  {user.prenom} {user.nom}, {user.activite} dans la ville de {user.ville} </h2>
                <p data-aos="fade-up" data-aos-delay="100">En vous inscrivant sur la plateforme SearchMeri, vous permettez aux gens de vos communautées de vous rejoindre grace a ce numéros {user.tel} et cet adress email : {user.email}</p>

          <div className="form-search d-flex align-items-stretch mb-3" data-aos="fade-up" data-aos-delay="200">
            <h1   className="form-control" placeholder="ZIP code or CitY" >The family is growing</h1>
       
          </div>

          <div className="row gy-4" data-aos="fade-up" data-aos-delay="400">

            <div className="col-lg-3 col-6">
              <div className="stats-item text-center w-100 h-100">
                      <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" className="purecounter">{users.length}</span>
                <p>Inscrits</p>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div className="stats-item text-center w-100 h-100">
                      <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" className="purecounter">{users.length}</span>
                <p>Active</p>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div className="stats-item text-center w-100 h-100">
                      <span data-purecounter-start="0" data-purecounter-end="1453" data-purecounter-duration="1" className="purecounter">+{1000}</span>
                <p>Objectif</p>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div className="stats-item text-center w-100 h-100">
                      <span data-purecounter-start="0" data-purecounter-end="32" data-purecounter-duration="1" className="purecounter">{ allPosts?.length}</span>
                <p>Posts</p>
              </div>
            </div>

          </div>
        </div>

        <div className="col-lg-5 order-1 order-lg-2 hero-img" data-aos="zoom-out">
          <img src="assets/img/hero-img.svg" className="img-fluid mb-3 mb-lg-0" alt="" />
        </div>

      </div>
          </div>
           
        </section>
     
      <h1 style={{fontSize:'1.8rem',textAlign:'center',padding:'15px'}}>Que voulez vous dire ?</h1>
       
        <FormPost />
        <br></br>
        <div className="name">
           <div className="py-4">
            <h1 className="mb-3">Publications</h1>
                {
                  // !isempty(allPosts[0]) &&
              allPosts
          // eslint-disable-next-line array-callback-return
          ?.filter( el => {
            if (el.activitePost?.toLocaleLowerCase().includes(user.activite?.toLocaleLowerCase())) {
              return true
            }
          }).slice(0,count)
          .map((el) => {
          return (
          <ListPost el={el}  />
          )
          })
            }
           
                </div>
        </div>
       
        </>
        
        }
      </>
    );
};

export default Home;