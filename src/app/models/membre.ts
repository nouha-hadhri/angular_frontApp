export interface Member { //ki testaamel interface ma testha9ech taamel constuctor
    id: number;
    cin: string;
    nom: string;
    prenom: string;
    dateNaissance: string;
    photo: string;
    email: string;
    password: string;
    type: string;
    cv: string;
    createDate: string;
    // ENSEIGNANT
    grade: string | null;
    etablissement: string | null;
    // ETUDIANT
    dateInscription: string | null; // yyyy-MM-dd
    diplome: string | null;
    encadrant: any | null; // Member de type ENSEIGNANT
}