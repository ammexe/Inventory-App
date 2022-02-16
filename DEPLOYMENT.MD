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
#### 4. JumpBox server (54.236.34.160)
A Jumpbox server is created to access workernodes of kubernetes and it is also hosting our jenkins CICD pipeline. ssh file to login to public node will be provided.

### Costs
1. We have used Nginx ingress as load balancer for our EKS cluster instead of using ALB which has saved us costs.
2. Managed ASG also helps us reduce some costs which will scale up and scale down according to resource usage.
3. Same case with HPA of kubernetes pods.
4. AWS cost estimates shows monthly forecasts arround 60-70$ a month.
5. RDS is costing us the most right now then EKS and then managed node group.
6. db.t3.micro RDS is costing us 14$ a month
7. 1 t3.large and 3 t3.small costing us arroung 80-90$ month
8. Arround 50$ a month for EKS.
9. Upon 100% resource usage our monthly bill cannot go more than 150$ a month.

### Monitoring
Rancher also provide Grafana dashboard to monitor the services at best. Grafana dashboard is built-in in Rancher.

# NOTE
Hello team, please note that I could have used other cost effective techniques which I think would be much lesser than this one, such as AWS Fargate or Lambda or just deploying an app on EC2, but I wanted to showcase my skills in which I have mostly worked on and in which I have  most of my experience. I can add GitOps using ArgoCD to the EKS cluster as well, also some advance monitoring techniques and alerts. The purpose of this task is to showcase my skills in which I am experienced and worked with. 