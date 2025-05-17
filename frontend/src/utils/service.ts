
import { useQuery,useMutation } from "@tanstack/react-query";
import type { FilterParams, HotelFormValues, Place,CreatePlaceResponse } from "../types";
import api from "./api";
import { useNavigate } from "react-router-dom";
import {toast} from  "react-toastify";


  // usequery hookuna api isteğinin ismini ve api isteğini atan fonksiyon veriyoruz
  // useqery bizim için api isteğini atıyor ve gelen cevaba göre stati'ini yönetiyor
  // isloading,error,data gibi stateleri bizim için otomatik tutuyor
  // otomatik olarak cache işlemi uygular
  // birden fazla component'da aynı veriye ihtiyacınız varsa state managment kütüphanesine gereke duymadan bütün componentl'larda useQuery ile api isteği atarız
 // hata durumunda 3 kez daha ekstra deneme yapar
 // anlık sunucu yogunlugundan kaynaklanacak hataların önüne geçeriz
  export const usePlaces = (params?: FilterParams) =>
     useQuery<Place[]>({
      // api isteğinin ismi
    queryKey: ["places",params],
    // then bölümünden return edilen veri useqery tarafından saklanır(data)
    queryFn: () => api.get("/places",{params}).then((res) => res.data.places),
    // hata durumunda  deneme sayısı
    retry: 3,
    //hata durumunda bekleme süresi
    retryDelay: 2000,
    //stale time:cachedeki verileri geçerli taze kalma süresidir
    staleTime: 0,
    // cachedeki verilerin geçersiz bayat olma temizlenme süresi
    gcTime: 30000,
  });

  // id ye göre bir veri döndüren api isteği
  export const usePlace = (id:string) => useQuery<Place>({
    queryKey:["place",id],
    queryFn: () => api.get(`/place/${id}`).then(res => res.data.place)
  })

  // id ye göre bir veri silen api isteği
  export const useDeletePlace = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["remove"],
        mutationFn: (id:string) => api.delete(`/place/${id}`),
        onSuccess: () => {
            toast.success("Konaklama noktası başarıyla kaldırıldı");
            navigate("/");
        },
        onError: () => {
            toast.error("Bir hata oluştu");
        },
        });
  };

  // yeni bir konaklama noktası olulturun apı isteği
  export const useCreatePlace = () => {
    const navigate = useNavigate();

    return useMutation({
      mutationKey: ["create"],
      mutationFn: (values: HotelFormValues) => api.post<CreatePlaceResponse>("/places",values),
    onSuccess: (res) => {
      toast.success("Konaklama noktası başarısıyla oluşturuldu");
      navigate(`/place/${res.data.place.id}`); //detay sayfasına
    },
    onError: () => {
      toast.error("Bir hata oluştu");
    },
    });
  };