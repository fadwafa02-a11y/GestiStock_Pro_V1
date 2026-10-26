# 📦 Gestion de Stock

Application web full-stack de gestion de stock, développée avec **Spring Boot** (backend) et **React** (frontend).

Elle permet de suivre les produits, les catégories et les fournisseurs, d'enregistrer les entrées et sorties de marchandises, et d'être alerté automatiquement lorsqu'un produit atteint un seuil critique.

---

## ✨ Fonctionnalités

- 🔐 **Authentification sécurisée** avec deux rôles : Administrateur et Employé
- 📊 **Tableau de bord** : résumé du stock, indicateurs clés et alertes
- 🛒 **Gestion des produits** : ajout, modification, suppression, détails, recherche et filtres
- 🗂️ **Gestion des catégories** : CRUD complet et liste des produits par catégorie
- 🚚 **Gestion des fournisseurs** : CRUD complet et consultation des informations
- 🔄 **Entrées / sorties de stock** : mise à jour automatique des quantités
- ⚠️ **Alertes de stock faible** : détection des produits sous le seuil critique
- 🔎 **Recherche et filtrage avancé** : par nom, catégorie ou fournisseur, avec tri
- 📄 **Export de rapports** : génération de fichiers PDF et Excel
- 👥 **Gestion des utilisateurs** (Admin) : comptes, rôles et permissions

---

## 🛠️ Technologies

| Couche | Technologies |
|---|---|
| **Frontend** | React, React Router, Axios |
| **Backend** | Java, Spring Boot, Spring Web, Spring Security, Spring Data JPA |
| **Base de données** | MySQL / PostgreSQL |
| **Outils** | Maven, npm, Git |

---

## 📁 Structure du projet

```
gestion_stock/
├── backend/     # API REST Spring Boot
├── frontend/    # Application React
└── README.md
```

---

## 🚀 Installation et lancement

### Prérequis

- Java 17 ou supérieur
- Maven
- Node.js et npm
- MySQL ou PostgreSQL

### 1. Cloner le projet

```bash
git clone https://github.com/VOTRE-NOM/NOM-DU-REPO.git
cd NOM-DU-REPO
```

### 2. Configurer la base de données

Créez une base de données (par exemple `gestion_stock`), puis renseignez vos identifiants dans `backend/src/main/resources/application.properties` :

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/gestion_stock
spring.datasource.username=VOTRE_UTILISATEUR
spring.datasource.password=VOTRE_MOT_DE_PASSE
spring.jpa.hibernate.ddl-auto=update
```

### 3. Lancer le backend

```bash
cd backend
mvn spring-boot:run
```

L'API est disponible sur `http://localhost:8080`.

### 4. Lancer le frontend

```bash
cd frontend
npm install
npm start
```

L'application est disponible sur `http://localhost:3000`.

---

## 👤 Rôles et droits

| Fonctionnalité | Admin | Employé |
|---|:---:|:---:|
| Consulter le stock et le tableau de bord | ✅ | ✅ |
| Gérer les produits | ✅ | ✅ |
| Entrées et sorties de stock | ✅ | ✅ |
| Gérer catégories et fournisseurs | ✅ | Lecture seule |
| Exporter des rapports | ✅ | ✅ |
| Gérer les utilisateurs | ✅ | ❌ |

---

## 🔮 Évolutions possibles

- Notifications par e-mail pour les stocks critiques
- Lecture de codes-barres
- Statistiques avancées et graphiques
- Gestion multi-entrepôts
- Déploiement avec Docker


