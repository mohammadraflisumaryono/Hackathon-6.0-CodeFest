// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Transaction {
    // Struktur data untuk mencatat penjaminan
    struct Guarantee {
        address guarantor; // Alamat penjamin
        uint256 loanId; // ID pinjaman
        uint256 amount; // Jumlah yang dijaminkan
        bool isHeld; // Status apakah dana sedang ditahan
    }

    // Struktur data untuk mencatat pembayaran
    struct Payment {
        address borrower; // Alamat peminjam
        address lender; // Alamat pemberi pinjaman
        uint256 loanId; // ID pinjaman
        uint256 amountPaid; // Jumlah yang dibayar
        uint256 timestamp; // Waktu pembayaran
    }

    mapping(uint256 => Payment[]) public loanPayments; // Penyimpanan pembayaran berdasarkan ID pinjaman
    mapping(uint256 => Guarantee[]) public loanGuarantees; // Penyimpanan jaminan berdasarkan ID pinjaman

    // Event untuk mencatat jaminan
    event GuaranteeMade(address indexed guarantor, uint256 loanId, uint256 amount);
    
    // Event untuk mencatat pembayaran yang dilakukan
    event PaymentMade(address indexed borrower, address indexed lender, uint256 loanId, uint256 amountPaid, uint256 timestamp);

    // Fungsi untuk mencatat jaminan
    function recordGuarantee(address _guarantor, uint256 _loanId, uint256 _amount) public {
        Guarantee memory newGuarantee = Guarantee({
            guarantor: _guarantor,
            loanId: _loanId,
            amount: _amount,
            isHeld: true // Menandai bahwa dana sedang ditahan
        });

        loanGuarantees[_loanId].push(newGuarantee); // Menambahkan jaminan baru ke dalam array jaminan
        emit GuaranteeMade(_guarantor, _loanId, _amount); // Memicu event
    }

    // Fungsi untuk mencatat pembayaran
    function recordPayment(address _borrower, address _lender, uint256 _loanId, uint256 _amountPaid) public {
        Payment memory newPayment = Payment({
            borrower: _borrower,
            lender: _lender,
            loanId: _loanId,
            amountPaid: _amountPaid,
            timestamp: block.timestamp
        });

        loanPayments[_loanId].push(newPayment); // Menambahkan pembayaran baru ke dalam array pembayaran
        emit PaymentMade(_borrower, _lender, _loanId, _amountPaid, block.timestamp); // Memicu event
    }

    // Fungsi untuk mengambil semua jaminan terkait dengan pinjaman tertentu
    function getGuarantees(uint256 _loanId) public view returns (Guarantee[] memory) {
        return loanGuarantees[_loanId]; // Mengembalikan semua jaminan yang dicatat untuk pinjaman tertentu
    }

    // Fungsi untuk mengambil semua pembayaran terkait dengan pinjaman tertentu
    function getPayments(uint256 _loanId) public view returns (Payment[] memory) {
        return loanPayments[_loanId]; // Mengembalikan semua pembayaran yang dicatat untuk pinjaman tertentu
    }
}
