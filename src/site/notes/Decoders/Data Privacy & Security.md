---
{"dg-publish":true,"permalink":"/decoders/data-privacy-and-security/","tags":["risk","surveillance","dataencryption","transparency","rolesandpermissions","sensitivedata","dataproducts"]}
---

### **What is it?**

Data privacy and security refers to the policies and practices in place to protect private or sensitive information. This might include, for example, [personally identifiable information](https://www.techtarget.com/searchsecurity/definition/personally-identifiable-information-PII) (PII), or any information that can be used to identify an individual. It could also include information about individuals’ movement that could be tracked if using handheld air quality monitors. To address risks associated with sensitive data, clear methods for safeguarding sensitive data need to be created. 


**The goals of privacy and security should include:** 
- *Data minimization*: Only collect what is needed and nothing more. Only necessary personal data should be collected to reduce the risks associated with data breaches.
- *Confidentiality*: Only share the data that is needed and nothing more. When possible, redact any PII to protect the subjects of the data. 
- *Data stewardship*: Establishing the roles and permissions of different data stewards or users is important because they dictate how the data is managed, including privacy and security decisions. 

  

**Some best practices to consider when developing privacy and security guidelines include:**
- **Good [[Decoders/Data Governance Models\|data governance models]]** reduce the risk for data breaches by putting policies in place that protect data at every stage, and setting clear roles to manage the number of people manipulating and viewing data.
- **Data risk assessments** involve reviewing practices around sensitive data to identify and prevent potential risks, such as data breaches, data loss, and unauthorized access.
- **Encryption and de-identification** are both data security controls that help secure PII. This reduces the likelihood of data being misused or incorrectly shared. 
	- **De-identification:** Data de-identification refers to removing or modifying any PII that could identify an individual (e.g., names, phone numbers, addresses, emails, etc.) to make it unlikely to identify anyone within the data set. Full data anonymization can be challenging if PII is collected, and is often easiest if no PII is collected or shared at all, though this can present barriers to useful analysis. To read more on best practices for de-identification, see [J-PAL’s Guide to De-identifying Data.](https://www.povertyactionlab.org/sites/default/files/research-resources/J-PAL-guide-to-deidentifying-data.pdf) 
	- **Encryption:** Data encryption secures data by using a secret key or algorithm so only authorized users can access or decrypt the data. To read more on the basics of data encryption, see [What Should I Know about Encryption](https://ssd.eff.org/module/what-should-i-know-about-encryption) from Surveillance Self-Defense.
- Data privacy frameworks are a set of processes that protect sensitive data and assess the potential risks. Many privacy frameworks exist, including the [National Institute of Standards and Technology (NIST) Privacy Framework](https://www.nist.gov/privacy-framework), which is aimed at helping to identify and manage privacy risk and protecting sensitive data. It is made to be flexible and easily adapted to the needs of an organization. For more information on the best methods for selecting a framework that fits your needs, see [A Guide to Selecting and Adopting a Privacy Framework](https://www.isaca.org/resources/isaca-journal/issues/2021/volume-2/a-guide-to-selecting-and-adopting-a-privacy-framework) from ISACA.
- Consider if there are datasets that could be shared as specific **data products** instead of as raw data sources. For example, an organization could share a map with aggregate neighborhood-level information instead of property-level information.
- Project teams can develop a **response plan** to address data breaches and unauthorized access to the data. This should include informing all stakeholders, assessing the risk of the breach, and addressing the breach to mitigate any potential harm.

 

> [!NOTE]
> **Questions to consider when adopting or creating a privacy and security framework:**
> - Who should be involved? 
> - What data or datasets are most at risk of misuse?
> - Are there datasets that should be closed completely?
> - If the data is sensitive, how might you share data products (e.g., maps, charts, statistics) instead of raw data?
> - Are there any privacy and security tools or practices already in place? 
> - Do you need legal protections?
> - What resources, like [[Decoders/Data Sharing Agreements\|data sharing agreements]], can you create to bolster data security?
  

**Why does it matter?** 

Data security and privacy helps prevent data breaches, safeguarding personal information collected to help prevent harm to individuals. By creating transparent and clear security and privacy guidelines, data collectors can build and strengthen trust with communities.


**Mentioned and additional resources:**

- To read more about the challenges faced by environmental initiatives in keeping their data safe and the role of strong privacy protocols, see [Safeguarding Sustainability: The Role of Data Privacy in Environmental Initiatives](https://insights.pecb.com/safeguarding-sustainability-the-role-of-data-privacy-in-environmental-initiatives/).
- To read a discussion of the importance of proactive data security and privacy measures, see [Data privacy and security challenges in environmental research: Approaches to safeguarding sensitive information](https://www.fepbl.com/index.php/ijarss/article/view/1210#:~:text=Key%20findings%20reveal%20a%20growing,Data%20Security%20Solutions%2C%20International%20Regulations).
- To learn more about addressing the challenges of data access, see [Responding to societal challenges with data: Access, sharing, stewardship and control](https://www.oecd-ilibrary.org/science-and-technology/responding-to-societal-challenges-with-data_2182ce9f-en).