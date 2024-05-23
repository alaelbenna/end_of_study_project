import React from "react";
import Navbar from "../Navbar/Navbar";

function support() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Centre Support </h1>
        <div className="presentation">
          <p>
            Dans le but de veiller à la satisfaction de nos clients, nous avons
            mis en place une page dédiée à la signalisation des problèmes pour
            vous. Nous comprenons qu'il est possible que des problèmes
            surviennent, et nous sommes toujours prêts à collaborer avec vous
            pour résoudre ces problèmes et vous offrir le meilleur service
            possible.
          </p>
          <p>
            Nous sommes fiers de proposer une solution novatrice en utilisant
            l'intelligence artificielle pour générer des photos de qualité
            professionnelle. Cependant, nous sommes conscients que des erreurs
            peuvent se produire. C'est pourquoi nous avons mis en place une page
            dédiée où vous pouvez signaler rapidement et facilement tout
            problème que vous pourriez rencontrer. Nous travaillerons en étroite
            collaboration avec vous pour garantir que tous les problèmes sont
            résolus rapidement et efficacement. Notre objectif est de vous
            offrir une expérience optimale en traitant rapidement les problèmes
            qui pourraient survenir.
          </p>
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="probleme">Problème :</label>
            <textarea
              id="probleme"
              name="probleme"
              required
              defaultValue={""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fichier">
              Ajouter un fichier (jusqu'à 10 Mo) :
            </label>
            <input
              type="file"
              id="fichier"
              name="fichier[]"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              multiple
            />
          </div>
          <button type="submit" id="report-btn" onclick="sendIMG()">
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}

export default support;
