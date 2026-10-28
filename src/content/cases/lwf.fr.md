---
lang: fr
title: "Le Web Français — porter la plateforme technique d'une société en forte croissance"
role: "Tech Lead / DevOps"
period: "Janv. 2020 – juil. 2026"
summary: "Architecture, qualité et exploitation d'une plateforme déclinée en plusieurs produits, pendant que la société passait de 4 à 12 personnes et que son activité était multipliée par ~15."
order: 1
stack: ["Symfony", "API Platform", "PostgreSQL", "Vue 3", "Quasar", "TypeScript", "Kubernetes", "Helm", "GitLab CI"]
---
**Le défi.** Faire grandir plusieurs produits et leur base technique avec une petite équipe : le plateau technique est passé de 2 à 5 personnes, la société de 4 à 12.

**Ce que j'ai porté**

- **Un socle commun plutôt qu'un produit par client.** SEKUR (gestion, planification et exécution des métiers de la sécurité, en PWA et application mobile) a été refondu. Le socle commun a ensuite servi à créer Propret et à décliner la plateforme en marque blanche pour plusieurs clients.
- **Moderniser sans tout casser.** API Symfony 3.4 → 6.4, PHP 7.1 → 8.4, MySQL/MariaDB → PostgreSQL. Migration d'un projet historique vers API Platform, et Vue 2 → Vue 3 (Quasar 2, Pinia, TypeScript, Capacitor).
- **Passer des VPS historiques à l'infrastructure as code.** Un cluster Kubernetes (charts Helm), exploité et maintenu en condition opérationnelle.
- **Industrialiser.** CI/CD GitLab, qualité de code avec SonarQube, Docker, supervision et analyse d'erreurs (Prometheus, Alertmanager, Grafana, Loki).
- **L'IA dans le processus.** Claude et Codex intégrés aux pratiques de l'équipe pour la maintenabilité et la qualité du code.

**Le résultat.** L'activité de la société a été multipliée par ~15 en six ans. SEKUR a changé d'échelle de clientèle, et Propret, créé de zéro sur le socle commun, est entré en exploitation auprès de nombreux clients.
