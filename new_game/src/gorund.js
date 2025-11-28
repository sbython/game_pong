import { MeshBuilder , StandardMaterial, Texture} from "@babylonjs/core"
export default function createground(scene)
{
    const opt = {
            width : 15, height: 15
        }
    const ground =  MeshBuilder.CreateGround("ground",opt,  scene);
    const material = new StandardMaterial("groundMaterial", scene);
    material.diffuseTexture = new Texture ("../asset/ground.jpg", scene);
    ground.material = material;
    return ground ;
}