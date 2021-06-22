import React from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import HTML from "react-native-render-html";

const Template = `
<div class="container d-flex justify-content-center mt-50 mb-50">
<div class="row">
    
       
        <div class="col-md-12 text-left mb-3">

        <br/>
        <br/>
        
      <div class="col-md-12 text-right mb-3">
        <button class="btn btn-primary" id="download"> download pdf</button>
  
      </div>
       

    <div class="col-md-12">
        <div class="card" id="invoice">
            <div class="card-header bg-transparent header-elements-inline">
              
                


                <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
                    <a class="navbar-brand js-scroll-trigger" href="#page-top">
                        <span class="d-block d-lg-none"> CV de (Nom et prenon )</span>
                        <span class="d-none d-lg-block"><img class="img-fluid img-profile rounded-circle mx-auto mb-2" src="assets/img/profile.jpg" alt="" /></span>
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                       
                    </div>
                </nav>
                <!-- Page Content-->
                <div class="container-fluid p-0">
                    <!-- About-->
                    <section class="resume-section" id="about">
                        <div class="resume-section-content">
                            <h1 class="mb-0">
                                (firstName)
                                <span class="text-primary">(SecondName)</span>
                            </h1>
                            <div class="subheading mb-5">
                                (Code postale) (Adresse) · (Ville) · (Numeros de télephone) ·
                                <a href="mailto:name@email.com">(mail)</a>
                            </div>
                            <p class="lead mb-5">Description du profil professionel </p>
                            <div class="social-icons">
                                <a class="social-icon" href="#"><i class="fab fa-linkedin-in"></i></a>
                                <a class="social-icon" href="#"><i class="fab fa-github"></i></a>
                                <a class="social-icon" href="#"><i class="fab fa-twitter"></i></a>
                                <a class="social-icon" href="#"><i class="fab fa-facebook-f"></i></a>
                            </div>
                        </div>
                    </section>
                    <hr class="m-0" />
                    <!-- Experience-->
                    <section class="resume-section" id="experience">
                        <div class="resume-section-content">
                            <h2 class="mb-5">Experience</h2>
                            <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
                                <div class="flex-grow-1">
                                    <h3 class="mb-0">(Name of experience)</h3>
                                    <div class="subheading mb-3">Descriptif de l'experience</div>
                                    <p>Description du profil </p>
                                </div>
                                <div class="flex-shrink-0"><span class="text-primary">(Date) - (Present)</span></div>
                            </div>
                            <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
                                <div class="flex-grow-1">
                                    <h3 class="mb-0">(Name of experience)</h3>
                                    <div class="subheading mb-3">(Descriptif de l'experience )</div>
                                    <p>Description de l'experience </p>
                                </div>
                                <div class="flex-shrink-0"><span class="text-primary">(Date) - (Time line)</span></div>
                            </div>
                            <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
                                <div class="flex-grow-1">
                                    <h3 class="mb-0">(Name of experience )</h3>
                                    <div class="subheading mb-3">(Descriptif de l'experience) </div>
                                    <p>Description du profil </p>
                                </div>
                                <div class="flex-shrink-0"><span class="text-primary">(Date)- (Time line)</span></div>
                            </div>
                            <div class="d-flex flex-column flex-md-row justify-content-between">
                                <div class="flex-grow-1">
                                    <h3 class="mb-0">(Name of experience)</h3>
                                    <div class="subheading mb-3">(Descriptif de l'experience)</div>
                                    <p>(Description du profil) </p>
                                </div>
                                <div class="flex-shrink-0"><span class="text-primary">(Date)-(Time line)</span></div>
                            </div>
                        </div>
                    </section>
                    <hr class="m-0" />
                    <!-- Education-->
                    <section class="resume-section" id="education">
                        <div class="resume-section-content">
                            <h2 class="mb-5">Education</h2>
                            <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
                                <div class="flex-grow-1">
                                    <h3 class="mb-0">(Name of school )</h3>
                                    <div class="subheading mb-3">Name of diplome</div>
                                    <div>Name of spécialisation</div>
                                    
                                </div>
                                <div class="flex-shrink-0"><span class="text-primary">(Date) - (Time line)</span></div>
                            </div>
                            <div class="d-flex flex-column flex-md-row justify-content-between">
                                <div class="flex-grow-1">
                                    <h3 class="mb-0">(Name of school)</h3>
                                    <div class="subheading mb-3"(>Name of diplome )</div>
                                    
                                </div>
                                <div class="flex-shrink-0"><span class="text-primary">(Date) -(Time line ) </span></div>
                            </div>
                        </div>
                    </section>
                    <hr class="m-0" />
                    <!-- Skills-->
                    <section class="resume-section" id="Competence">
                        <div class="resume-section-content">
                            <h2 class="mb-5">Competence </h2>
                            <div class="subheading mb-3">Programming Languages & Tools</div>
                            <ul class="list-inline dev-icons">
                                
                            </ul>
                            <div class="subheading mb-3">(Compétence effectué)</div>
                            <ul class="fa-ul mb-0">
                                <li>
                                    <span class="fa-li"><i class="fas fa-check"></i></span>
                                    (Name Competence - Description competence)
                                </li>
                                <li>
                                    <span class="fa-li"><i class="fas fa-check"></i></span>
                                    (Name Competence) - (Description competence)
                                </li>
                                <li>
                                    <span class="fa-li"><i class="fas fa-check"></i></span>
                                    (Name competence) - (Description competence)
                                </li>
                                <li>
                                    <span class="fa-li"><i class="fas fa-check"></i></span>
                                    (Name competence) - (Description competence )
                                </li>
                            </ul>
                        </div>
                    </section>
                    <hr class="m-0" />
                    <!-- Interests-->
                    <section class="resume-section" id="interests">
                        <div class="resume-section-content">
                            <h2 class="mb-5">Interests</h2>
                            <p>Description de l'interet avec le non et la Description</p>
                            <p class="mb-0">>Description de l'interet avec le nom et la Description</p>
                        </div>
                    </section>
                    <hr class="m-0" />
                    <!-- Awards-->
                    <section class="resume-section" id="awards">
                        <div class="resume-section-content">
                            <h2 class="mb-5">Diplome et certification</h2>
                            <ul class="fa-ul mb-0">
                                <li>
                                    <span class="fa-li"><i class="fas fa-trophy text-warning"></i></span>
                                    (Name of diplome or certif )
                                </li>
                                <li>
                                    <span class="fa-li"><i class="fas fa-trophy text-warning"></i></span>
                                    (Name of diplome or certif)
                                </li>
                                <li>
                                    <span class="fa-li"><i class="fas fa-trophy text-warning"></i></span>
                                    
                                 
                                    (Name of diplome)
                                </li>
                                <li>
                                    <span class="fa-li"><i class="fas fa-trophy text-warning"></i></span>
                                   
                                    (Name of diplome)
                                <li>
                                    <span class="fa-li"><i class="fas fa-trophy text-warning"></i></span>
                                    (Name of diplome)
                                </li>
                                <li>
                                    <span class="fa-li"><i class="fas fa-trophy text-warning"></i></span>
                                   (Name of diplome)
                                </li>
                                <li>
                                    <span class="fa-li"><i class="fas fa-trophy text-warning"></i></span>
                                   (Name of diplome)
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
                <!-- Bootstrap core JS-->
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"></script>
                <!-- Third party plugin JS-->
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
                <!-- Core theme JS-->
                <script src="js/scripts.js"></script>
            
        
            </div>          
    </div>
</div>
</div>
`;

export default function Demo() {
  const contentWidth = useWindowDimensions().width;
  return (
    <ScrollView style={{ flex: 1 }}>
      <HTML source={{ html: Template }} contentWidth={contentWidth} />
    </ScrollView>
  );
}
