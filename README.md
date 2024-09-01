
# ICN CASHING 

ICA management platform (Internal Credit Notices)
(https://readme.so/fr/editor)

## Features

### Client 
- [x] Light/dark mode toggle
- [ ] Fullscreen mode
- [x] Full responvive (Mobile first UX)
- [x] Secure client side base of server authentication

### Server 

#### Authentication
- [x] user registration
- [x] user activation
- [x] user login
- [x] user logout 
- [x] user refresh access token 
- [x] middleware isAuthentificated
- [x] middleware authorizeRole
- [x] Assign a role to a user
- [x] get user information
- [x] get all users --only for admin
- [x] update user information
- [x] update user password
- [x] delete user
- [ ] user ldap-auth
- [ ] user two-factor-auth 
#### analytic
- [ ] users analytics
- [ ] internal credit advice transaction analytics
#### Unpaid Bill Information
- [ ] Search (one|many)unpaid bill by (Contract|Invoice|Customer_Regroup|Customer_name)
- [x] Search unpaid bill by Contract Number
- [x] Search unpaid bill by Invoice Number
- [x] Search unpaid bill by Customer Regroup Number
- [x] Search unpaid bill by Customer Name
- [ ] Requete_Impayes_Sur_Liste
- [ ] Requete_Impayes_Sur_Liste_Avec_Compte
#### ICN (Intern Credit Information)
- [x] Get list of Regroupement
- [x] Get next icn code
- [x] Get next dematerialization code
- [ ] Search Intern Credit Information By ICN ID Number
- [x] Creation of an internal credit advice transaction
- [x] Get information avout internal credit advice transaction
- [ ] update of an internal credit advice transaction
- [ ] update status of an internal credit advice transaction
- [ ] validation of an internal credit advice transaction
- [x] Soft delete an internal credit advice transaction
- [x] Generation of the ICN TO CMS integration file
#### notifications
- [x] get all notifications
- [x] get user notifications
- [ ] update notifications status
- [ ] delete notifications (cronjob)
#### Bank
- [x] get all banks
- [x] get bank information 
- [x] admin create a new bank 
- [ ] admin update bank information 
- [ ] admin delete bank

#### Payment mode
- [x] get all payment modes
- [x] get a payment mode information 
- [x] create a new payment mode 
- [ ] update payment mode information 
- [ ] delete payment mode
  
#### Settings
- [x] get list all settings
- [x] update settings

#### Seccurity
- [ ] get IP address/and Hostname of the user machine
- [ ] historic table for tracking ressources changes

## Tech Stack test

**Client:** Typescript , React/Next, TailwindCSS , Shadcn-ui

**Server:** Typescript , node.js/bun , express , redis , ejs


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`


## Authors

- [@eugenekoule](https://github.com/Eugene2016)
- [@hervepoh](https://github.com/Hervepoh)
- [@Jacques Armand Nyog](https://github.com/Maccabee1989)
- [@samuel](https://github.com/samuel1544)
