
import libxmljs2 from 'libxmljs2';


export const getXmlNode = (xml) =>{
    const xmlDoc = libxmljs2.parseXml(xml);
    const xmlNode = xmlDoc.childNodes();
    return xmlNode.toString();
  }

export const getXmlChildren = (xml, nodeName) => {
    const doc = libxmljs2.parseXml(xml);
    const childNodes = doc.childNodes();
    const filterByNodeName = childNodes.filter(_ => _.toString().includes(`<${nodeName}`));
    if (filterByNodeName.length)
    {
        return filterByNodeName[0].toString();
    }
    return null;
}

export const getXmlValue = (xml) => {
    try {
        
        const xmlDoc = libxmljs2.parseXml(xml);
        return xmlDoc.root().text();
    } catch (er) {
        return '';
    }
}

export const parseToXml = (xmlStr) => libxmljs2.parseXml(xmlStr)