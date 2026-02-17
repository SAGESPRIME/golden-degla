# Miel Bio E-commerce

Site e-commerce moderne pour la vente de miel bio artisanal français.

## Technologies

- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **Backend**: Convex (base de données temps réel)
- **Authentification**: Convex Auth
- **Paiement**: Stripe Checkout + Webhooks
- **Déploiement**: Vercel

## Fonctionnalités

### 🛍️ E-commerce
- Catalogue produits avec images
- Panier persistant
- Checkout sécurisé avec Stripe
- Gestion des commandes

### 👤 Authentification
- Connexion email/mot de passe
- Protection des routes
- Gestion des sessions

### 📊 Administration
- Dashboard admin
- Gestion produits/commandes
- Suivi des stocks

### 💳 Paiement
- Intégration Stripe Checkout
- Webhooks pour mise à jour automatique
- Gestion des états de commande

## Installation

1. **Cloner et installer les dépendances**
```bash
npm install
```

2. **Configuration Convex**
```bash
npx convex dev
```

3. **Variables d'environnement**
Créer un fichier `.env.local`:
```
NEXT_PUBLIC_URL=http://localhost:5173
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

4. **Configuration Stripe**
- Créer un compte Stripe
- Configurer les webhooks sur `https://votre-domaine.com/api/stripe/webhook`
- Événements à écouter: `checkout.session.completed`

5. **Données initiales**
Créer des catégories et produits via le dashboard admin (utilisateur avec email contenant "admin").

## Structure du projet

```
src/
├── components/          # Composants React
│   ├── Header.tsx      # En-tête avec navigation
│   ├── ProductList.tsx # Liste des produits
│   ├── Cart.tsx        # Panier
│   └── CheckoutForm.tsx # Formulaire de commande
├── App.tsx             # Composant principal
└── main.tsx           # Point d'entrée

convex/
├── schema.ts          # Schéma base de données
├── products.ts        # Gestion produits
├── cart.ts           # Gestion panier
├── orders.ts         # Gestion commandes
├── stripe.ts         # Intégration Stripe
└── router.ts         # Routes HTTP (webhooks)
```

## Déploiement

### Vercel
1. Connecter le repository GitHub
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Variables d'environnement production
```
NEXT_PUBLIC_URL=https://votre-domaine.com
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## Sécurité

- Validation des données côté serveur (Convex)
- Authentification requise pour actions sensibles
- Vérification des permissions admin
- Webhooks Stripe sécurisés

## Performance

- Images optimisées avec Convex Storage
- Pagination des produits
- Cache des requêtes Convex
- Bundle optimisé avec Vite

## Support

Pour toute question technique, consulter la documentation:
- [Convex](https://docs.convex.dev)
- [Stripe](https://stripe.com/docs)
- [TailwindCSS](https://tailwindcss.com/docs)
