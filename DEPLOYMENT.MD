# EKS on top of three tier VPC

We have a VPC(**eksVPC**) in two different AZ in **US-EAST-1** region. Each AZ(**US-ESAT-1A** and **US-EAST-1B**) has three subnets one public and two private. Overall, there are total six subnets in VPC.
1. PublicSN1
2. PublicSN02
3. PrivateSN1
4. PrivateSN2
5. dbSN1
6. dbSN2

A **NATGATEWAY** is created in public subnet so that nodes in PrivateSN1 and PrivateSN2 can access internet. **IGW** is created and attached to eksVPC so that nodes in PublicSN1 and PublicSN02 can access internet. dbSN1 and dbSN2 has no access to the internet because this is where our database is and only the nodes in PrivateSN1 and PrivateSN2 can access it.

EKS(**EKS-prod**) is created in PublicSN1, PublicSN02, PrivateSN1 and PrivateSN. The reason for assigning public and private both to EKS is explained in security section.

## Applications

#### [Inventory-app](https://live.inventory-app.com)
#### [backend API](https://api.inventory-app.com)
#### [Rancher](https://rancher.inventory-app.com)
#### [Jenkins](http://54.236.34.160:8080/login?from=%2F)

The credentials for rancher and jenkins are available in a separate file.

Rancher provides a GUI for managing a single or multiple kubernetes clusters. It is a complete software stack for teams adopting containers. It addresses the operational and security challenges of managing multiple Kubernetes clusters across any infrastructure, while providing DevOps teams with integrated tools for running containerized workloads.

### Autoscaling

#### 1. Vertical Scaling
A managed node group contains a minimum of three worker nodes and a maximum of 4 worker nodes which will be autoscaled based on CPU and RAM usage. This feature can be changed based on requirement.

#### 2. Horizontal Scaling
Every resource is assigned a minimum and maximum quota, as soon as the pod reaches its maximum limit quota. The HPA created for every deployment will scale that pod to one more replica. Right now the maximum number of replicas is set to 3 and a minimum is set to 2. Which can be easily changed based on requirement.

### Security
#### 1. EKS
Amazon EKS cluster in a VPC with public and private subnets so that Kubernetes can create public load balancers in the public subnets that load balance traffic to pods running on nodes that are in private subnets. Nodes in private subnet can access the Internet through NAT Gateway but no outbound traffic is allowed from Public internet.
#### 2. Database
Database RDS is created in private subnet (dbSN1,dbSN2), no inbound or outbound traffic is allowed to public Internet. Only the resources which exists in VPC can access the DB.
#### 3. Cert-manager
Cert-manager adds certificates and certificate issuers as resource types in Kubernetes clusters, and simplifies the process of obtaining, renewing and using those certificates. All public URL's sending traffic to EKS cluster are ssl encrypted.
#### 4. DB-credentials
Backend is passed with encrypted DB credentials to access.