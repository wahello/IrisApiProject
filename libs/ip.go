package libs

import (
	"fmt"
	"net"
	"net/http"
	"strings"
)

func ClientIp(r *http.Request) string {
	xForwardedFor := r.Header.Get("X-Forwarded-For")
	ip := strings.TrimSpace(strings.Split(xForwardedFor, ",")[0])
	if ip != "" {
		return ip
	}
	ip = strings.TrimSpace(r.Header.Get("X-Real-Ip"))
	if len(ip) > 0 {
		return ip
	}
	if ip, _, err := net.SplitHostPort(strings.TrimSpace(r.RemoteAddr)); err != nil {
		return ip
	}
	return ""
}

func ClientPublicIp(r *http.Request) string {
	var ip string
	xForwardedFor := r.Header.Get("X-Forwarded-For")
	fmt.Println(fmt.Sprintf("xForwardedFor :%s", xForwardedFor))
	for _, ip := range strings.Split(xForwardedFor, ",") {
		ip = strings.TrimSpace(ip)
		if len(ip) > 0 && !HasLocalIpAddr(ip) {
			return ip
		}
	}
	ip = strings.TrimSpace(r.Header.Get("X-Real-Ip"))
	fmt.Println(fmt.Sprintf("X-Real-Ip :%s", ip))
	if len(ip) > 0 && !HasLocalIpAddr(ip) {
		return ip
	}
	if ip, _, err := net.SplitHostPort(strings.TrimSpace(r.RemoteAddr)); err != nil {
		fmt.Println(fmt.Sprintf("SplitHostPort :%s", ip))
		if !HasLocalIpAddr(ip) {
			return ip
		}
	}
	return ""

}

func HasLocalIpAddr(ip string) bool {
	return net.ParseIP(ip).IsLoopback()
}
