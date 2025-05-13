---
eleventyExcludeFromCollections: true
title: "Keycloak Toolkit"
excerpt: "TODO"
featured_img: /_images/default-thumb.jpg
tags: []
---
I spent a lot of time in my last position mucking about with [Keycloak](https://www.keycloak.org), an open-source identity provider (IdP). This was the fourth IdP that I've been able to gain extended experience with (2 open source, 2 closed) and I found it to be quite competent. I could do without the [near mile-long single page of server admin documentation](https://www.keycloak.org/docs/latest/server_admin/index.html) and the single-page app admin UI but we were able to do pretty much everything we needed to do, even if it took a while to get there.
## CLI

https://github.com/joshcanhelp/keycloak-toolkit/tree/main/cli

## Configuration

A big part of following a "cloud native" approach (a term that sounds straight out of _Tears of the Kingdome_) is deploying services in a way that's reproducible and reliable. Do you know what's not reproducible or reliable? **Everyone logging into an admin UI to make changes.** Keycloak has [admin events](https://www.keycloak.org/docs/latest/server_admin/index.html#auditing-admin-events) which can help to figure out who did what when (if you turn them on) but this won't help you recreate existing environments or spin up new ones.

Ideally, what you want is a way to store (non-sensitive) configuration in version control with changes made view PR. Everyone with access to the repo can create a PR and something like a CODEOWNERS file can determine who should review the changes. Changes to specific applications can be reviewed by the teams that own those applications while cross-cutting changes with security implications, like session lengths and token expirations, can pass through the security org for approval. When the PR is merged, the changes go live in the affected environments, no logins required. This reduces the IAM burden of provisioning access and can reduce drift in local and development environments.

🌈 🦄 🌈 **Rainbows and unicorns!** 🦄 🌈 🦄

Besides all the other great stuff, one big thing I wanted to address with this kind of system was the maintenance burden in certain environments. At my previous company, we were planning to deploy our systems to infrastructure that required a security clearance to access. The chance of our team getting the clearance we needed in all the environments we wanted to operate in was slim so ... let's send in the robots! Merging in a change would push a new image to a configuration service and run the update commands, all without admin UI interaction.

- New or existing realm should not matter
	- How to generate the first realm file?
		- Create a template
			- https://www.keycloak.org/docs/latest/server_admin/index.html#mitigating_security_threats
		- Export the realm from the CLI
			- `./bin/kcadm.sh config credentials --user admin --password admin --server http://host.docker.internal:8081 --realm master`
			- `./bin/kcadm.sh get realms/master > realm-api.json`
		- Export from UI and parse, remove:
			- authenticationFlows
			- clientScopes
			- components
			- defaultDefaultClientScopes
			- defaultOptionalClientScopes
			- identityProviderMappers
			- identityProviders
			- keycloakVersion
			- localizationTexts
			- requiredActions
			- scopeMappings
	- How to handle multiple realms?

