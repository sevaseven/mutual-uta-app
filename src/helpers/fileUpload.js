const baseUrl = process.env.REACT_APP_API_URL;

export const fileUpload = async (file, idBeneficiario, idTipoDocumentacion) => {
  const url = `${baseUrl}/fileUpload/UploadFile/${idBeneficiario}/${idTipoDocumentacion}`;
  const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
  let httpHeaders;
  if (token) {
    httpHeaders = {
      Authorization: `Bearer ${token}`,
    };
  }
  const formData = new FormData();
  formData.append("files", file);
  try {
    const resp = await fetch(url, {
      method: "POST",
      body: formData,
      headers: httpHeaders
    });

    if (resp.ok) {
      const respCloud = await resp.json();
      return respCloud;
    } else {
      throw await resp.json();

    }
  } catch (error) {
    console.log("Function [fileUpload]", error);
  }
};


export const fileUploadStage = async (file, idBeneficiario, idTipoDocumentacion) => {
  try {
    const url = `${baseUrl}/fileUpload/UploadFileStage/${idBeneficiario}/${idTipoDocumentacion}`;
    const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
    let httpHeaders;
    if (token) {
      httpHeaders = {
        Authorization: `Bearer ${token}`,
      };
    }
    const formData = new FormData();
    formData.append("files", file);
    const resp = await fetch(url, {
      method: "POST",
      body: formData,
      headers: httpHeaders
    });

    if (resp.ok) {
      const respCloud = await resp.json();
      return respCloud;
    } else {
      throw await resp.json();

    }
  } catch (error) {
    console.log("Function [fileUploadStage]", error);
  }
};

export const fileUploadStageFamiliar = async (file, idBeneficiario, idTipoDocumentacion) => {
  const url = `${baseUrl}/fileUpload/UploadFileStage/Familiar/${idBeneficiario}/${idTipoDocumentacion}`;
  const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
  let httpHeaders;
  if (token) {
    httpHeaders = {
      Authorization: `Bearer ${token}`,
    };
  }
  const formData = new FormData();
  formData.append("files", file);
  try {
    const resp = await fetch(url, {
      method: "POST",
      body: formData,
      headers: httpHeaders
    });

    if (resp.ok) {
      const respCloud = await resp.json();
      return respCloud;
    } else {
      throw await resp.json();

    }
  } catch (error) {
    console.log("Function [fileUploadStageFamiliar]", error);
  }
};

export const fileUploadCertificado = async (file, idCertificado, esPreAfiliacion) => {
  const url = `${baseUrl}/fileUpload/${esPreAfiliacion ? 'UploadFileCertificadoPreAfiliacion' : 'UploadFileCertificado'}/${idCertificado}`;
  const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
  let httpHeaders;
  if (token) {
    httpHeaders = {
      Authorization: `Bearer ${token}`,
    };
  }
  const formData = new FormData();
  formData.append("files", file);
  try {
    const resp = await fetch(url, {
      method: "POST",
      body: formData,
      headers: httpHeaders
    });

    if (resp.ok) {
      const respCloud = await resp.json();
      return respCloud;
    } else {
      throw await resp.json();

    }
  } catch (error) {
    console.log("Function [fileUploadCertificado]", error);
  }
};
export const fileUploadUserImage = async (file, idUsuario) => {
  const url = `${baseUrl}/fileUpload/UploadFileUserImage/${idUsuario}`;
  const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
  let httpHeaders;
  if (token) {
    httpHeaders = {
      Authorization: `Bearer ${token}`,
    };
  }
  const formData = new FormData();
  formData.append("file", file);
  try {
    const resp = await fetch(url, {
      method: "POST",
      body: formData,
      headers: httpHeaders
    });

    if (resp.ok) {
      const respCloud = await resp.json();
      return respCloud;
    } else {
      throw await resp.json();

    }
  } catch (error) {
    console.log("Function [fileUploadUserImage]", error);
  }
};
export const fileUploadUserFirma = async (file, idUsuario) => {
  const url = `${baseUrl}/fileUpload/UploadFileUserSignature/${idUsuario}`;
  const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
  let httpHeaders;
  if (token) {
    httpHeaders = {
      Authorization: `Bearer ${token}`,
    };
  }
  const formData = new FormData();
  formData.append("file", file);
  try {
    const resp = await fetch(url, {
      method: "POST",
      body: formData,
      headers: httpHeaders
    });

    if (resp.ok) {
      const respCloud = await resp.json();
      return respCloud;
    } else {
      throw await resp.json();

    }
  } catch (error) {
    console.log("Function [fileUploadUserImage]", error);
  }
};

export const fileUploadPaymentFile = async (file) => {
  const url = `${baseUrl}/BeneficiariosFacturas/uploadPaymentFile`;
  const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
  let httpHeaders;
  if (token) {
    httpHeaders = {
      Authorization: `Bearer ${token}`,
    };
  }
  const formData = new FormData();
  formData.append("file", file);

  const resp = await fetch(url, {
    method: "POST",
    body: formData,
    headers: httpHeaders
  });

  if (resp.ok) {
    const respCloud = await resp.json();
    return respCloud;
  } else {
    throw await resp.json();
  }
};

export const fileDeleteUserFirma = async (idUsuario) => {
  const url = `${baseUrl}/fileUpload/DeleteUserSignature/${idUsuario}`;
  const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
  let httpHeaders;
  if (token) {
    httpHeaders = {
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ idUsuario }),
      headers: httpHeaders
    });

    if (!resp.ok) {
      throw await resp.json();
    }

  } catch (error) {
    console.log("Function [fileDeleteUserSignature]", error);
  }
};

export const fileDeleteUserImage = async (idUsuario) => {
  const url = `${baseUrl}/fileUpload/DeleteUserImage/${idUsuario}`;
  const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
  let httpHeaders;
  if (token) {
    httpHeaders = {
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ idUsuario }),
      headers: httpHeaders
    });

    if (!resp.ok) {
      throw await resp.json();
    }

  } catch (error) {
    console.log("Function [fileDeleteUserImage]", error);
  }
};

export const fileUploadMesaEntrada = async (idExpediente, file) => {
  const url = `${baseUrl}/FileUpload/UploadFileDocumentacionMesaEntrada/${idExpediente}`;
  const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
  let httpHeaders;
  if (token) {
    httpHeaders = {
      Authorization: `Bearer ${token}`,
    };
  }
  const formData = new FormData();
  formData.append("files", file);

  const resp = await fetch(url, {
    method: "POST",
    body: formData,
    headers: httpHeaders
  });

  if (resp.ok) {
    const respCloud = await resp.json();
    return respCloud;
  } else {
    throw await resp.json();
  }
};

