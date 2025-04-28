import { Asset } from "expo-asset";

async function getUriFromImport(source: any) {
  const asset = Asset.fromModule(source);
  await asset.downloadAsync(); // nếu chưa load thì load
  return asset.uri // đây chính là đường dẫn kiểu "file:///..."
}

export default getUriFromImport;

