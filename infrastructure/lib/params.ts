interface StackParams {
  deploymentAccount: string;
  deploymentRegion: string;
  resourceNameSuffix: string;
  vpcId: string;
}

const accounts = {
  // mark's account
  dev: "780816973348",
  prod: "780816973348",
};

const vpcIds = {
  dev: "780816973348",
  prod: "780816973348",
};
export const params: { [x: string]: StackParams } = {
  dev: {
    deploymentAccount: accounts["dev"],
    deploymentRegion: "ap-southeast-2",
    resourceNameSuffix: "dev",
    vpcId: vpcIds["dev"],
  },
  prod: {
    deploymentAccount: accounts["dev"],
    deploymentRegion: "ap-southeast-2",
    resourceNameSuffix: "prod",
    vpcId: vpcIds["prod"],
  },
};
